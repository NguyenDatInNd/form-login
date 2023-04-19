import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@material-ui/icons/Language";

const Language = () => {
  const { t } = useTranslation();
  return (
    <>
      <span style={{position:"relative", fontWeight:"600",top:'-6px'}}>{t('languge')}</span>
      <LanguageIcon fontSize="small" />
    </>
  );
};
const Nav = () => {
  const { i18n } = useTranslation();
  const [lng, setLng] = React.useState<String>("vi");
  return (
    <div style={{ position: "fixed", top: "20px", right: "20px" }}>
      <TextField
        label={<Language />}
        select
        variant="outlined"
        defaultValue={lng}
        value={lng}
        onChange={(e) => {
          setLng(e.target.value);
          i18n.changeLanguage(e.target.value);
        }}
      >
        <MenuItem value={"vi"}>Tiếng việt</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
      </TextField>
    </div>
  );
};

export default Nav;

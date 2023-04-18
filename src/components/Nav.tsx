import React from "react";

import { useTranslation } from "react-i18next";

const Nav = () => {
  const { i18n } = useTranslation();

  const changLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: "fixed" }}>
      <button onClick={() => changLanguage("vi")}>Tiếng việt</button>
      <button onClick={() => changLanguage("en")}>English</button>{" "}
    </div>
  );
};

export default Nav;

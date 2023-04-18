import logo from "../../logo-420-x-108.png";
import LoginForm from "./FormLogin";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div
      className="container"
      style={{
        // background:"rgb(66,66,66",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img style={{ maxWidth: "250px", margin: "32px" }} alt="" src={logo} />
      <LoginForm />
      <br />
      <Link to="/SignUp">{t('register')}</Link>
    </div>
  );
};
export default LoginPage;

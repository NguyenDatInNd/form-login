import FormSignUp from "./FormSignup";
import logo from "../../logo-420-x-108.png";


const PageSignUp = () => {
    return (
        <div  style={{
            // background:"rgb(66,66,66",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
            <FormSignUp />
        </div>
    )
}
export default PageSignUp;
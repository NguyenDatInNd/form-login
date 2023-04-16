import React from "react";
import logo from '../logo-420-x-108.png'
import LoginForm from "./FormForm";


const LoginPage = () => {
    return (
        <div
        className="container"
        style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
            <img style={{ maxWidth: '250px', margin: '32px' }} src = {logo}/>
            <LoginForm/>
        </div>
    )
}
 export default LoginPage;
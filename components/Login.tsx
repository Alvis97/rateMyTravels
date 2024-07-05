import Head from "next/head";
import Link from "next/link";


//Styles
import loginSignUpStyle from "../styles/pages/LoginSignUp.module.scss";


function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className={loginSignUpStyle.parent}>
    
      </div>
    </>
  );
}

export default Login;
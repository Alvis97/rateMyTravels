import Link from "next/link";
import React from "react";
import navigationStyle from "../styles/components/navigation.module.scss";
import { LogoSmall } from "./Icons";


function Navigation() {
  //const user = useCurrentUser();
  return (
    <div className={navigationStyle.parent}>
      <div className={navigationStyle.section1}>

      <ul className={navigationStyle.ul}>
      <li><Link href="/" className={navigationStyle.link}>Home</Link></li>
      <li><Link href="/about" className={navigationStyle.link}>About</Link></li>
      <li><Link href="/features" className={navigationStyle.link}>Features</Link></li>
    </ul>
      {/*         <Link className={navigationStyle.link} href={"/"}>Home</Link>
        {/* <Link href={"./features"}>Features</Link> 
        <Link className={navigationStyle.link} href={"./about"}>About</Link>
        <Link className={navigationStyle.link} href={"./features"}>Features</Link> */}

      </div>  
      <div className={navigationStyle.section2}>
        <Link href={"/"} className={navigationStyle.logo}>
          <LogoSmall/>
        </Link>
      </div>

        <div className={navigationStyle.section3}>
            {/*<Link href={"./workspaces"} className={navigationStyle.CFAButton}>
              <span>My Profile</span>
  </Link>*/}
            <>
              <Link className={navigationStyle.link} href={"./login"}>Login</Link>
              <span className={navigationStyle.span}>|</span>
              <Link className={navigationStyle.CFAButton} href={"./signup"}>
                Join Community
              </Link>
            </>
        </div>
   
      </div>
  );
}

export default Navigation;
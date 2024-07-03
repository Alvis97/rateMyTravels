"use client";

import React from "react";
import hamburgerMenuStyle from "../styles/components/hamburgerMenu.module.scss";
import Link from "next/link";
import { LogoSmall, Hamburger } from "./Icons";

function HamburgerMenu() {
    return (
      <div className={hamburgerMenuStyle.parent}>
        <div className={hamburgerMenuStyle.section1}>
        <Link href={""}></Link> 
        </div>
        <div className={hamburgerMenuStyle.section2}>
        <Link href={""}></Link>
        </div>
      </div>  
 
    );
  }
  
  export default HamburgerMenu;
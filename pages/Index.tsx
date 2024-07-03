import { Hamburger } from "@/components/Icons";
import Navigation from "@/components/Navigations";
import HamburgerMenu from "@/components/hamburgerMenu";
import Head from "next/head";
import React from "react";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Navigation/>
      <HamburgerMenu/>
      <main>
        <div>
         
          <h1>Homepage</h1>
        </div>
      </main>
    </>
  );
}

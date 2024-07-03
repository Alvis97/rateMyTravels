import { Hamburger } from "@/components/Icons";
import Navigation from "@/components/Navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import Head from "next/head";
import React from "react";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Homepage</title>
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

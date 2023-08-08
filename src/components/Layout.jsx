import Head from "next/head";
import React from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import login from "../styles/login.module.scss";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MULTIQUIZ</title>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        ></link>
      </Head>
      {router.pathname === "/login" || router.pathname === "/newAccount" ? (
        <div className={login.container_login}>{children}</div>
      ) : (
        <div>
          <SideBar />
          <main>{children}</main>
        </div>
      )}
    </>
  );
};

export default Layout;

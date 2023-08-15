import Head from "next/head";
import React from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import login from "../styles/login.module.scss";
import styleLayout from "../styles/layout.module.scss";
import Link from "next/link";

const Layout = ({ children, title }) => {
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
        <div className={styleLayout.layoutContainer}>
          <SideBar />
          <main className={styleLayout.main}>
            <div className={styleLayout.containerAccount}>
              <div className={styleLayout.title}>{title}</div>
              <div className={styleLayout.btnAccount}>
                <Link href="login" className={styleLayout.btn}>
                  Iniciar Sesión
                </Link>
                <Link href="newAccount" className={styleLayout.btn}>
                  Crear Cuenta
                </Link>
              </div>
            </div>
            <div className={styleLayout.children}>{children}</div>
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;

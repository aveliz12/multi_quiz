import Head from "next/head";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import login from "../styles/login.module.scss";
import styleLayout from "../styles/layout.module.scss";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import * as FaIcons from "react-icons/fa";
// import {
//   doc,
//   getDoc,
//   getFirestore,
//   collection,
//   getDocs,
// } from "firebase/firestore";
const Layout = ({ children, title }) => {
  const router = useRouter();

  //const [confirm, setConfirm] = useState(false);

  //EXTRAER LOS USUARIOS POR SU ROL

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      // Redirige a la página de inicio de sesión u otra página
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  return (
    <>
      <Head>
        <title>MULTIQUIZ</title>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
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
              <button className={styleLayout.li} onClick={handleSignOut}>
                <i className={styleLayout.i}>
                  <FaIcons.FaSignOutAlt />
                </i>
              </button>
            </div>
            <div className={styleLayout.children}>{children}</div>
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;

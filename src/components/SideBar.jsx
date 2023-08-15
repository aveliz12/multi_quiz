import React from "react";
import Image from "next/image";
import * as FaIcons from "react-icons/fa";
import sideBarStyle from "../styles/sideBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
const SideBar = ({ userRole }) => {
  const router = useRouter();

  return (
    <>
      <nav className={sideBarStyle.nav}>
        <div className={sideBarStyle.nav_image}>
          <Image
            src="/images/logo_juego.png" // Ruta relativa a la carpeta "public"
            alt="Descripción de la imagen"
            width={85}
            height={80}
          />
        </div>
        <ul className={sideBarStyle.nav_links}>
          {userRole === "admin" && (
            <Link href="/" className={sideBarStyle.li}>
              <i className={sideBarStyle.i}>
                <FaIcons.FaUserFriends />
              </i>
              <span className={sideBarStyle.span}>Usuarios</span>
            </Link>
          )}

          <Link href="/categories" className={sideBarStyle.li}>
            <i className={sideBarStyle.i}>
              <FaIcons.FaClipboardList />
            </i>
            <span className={sideBarStyle.span}>Categorias</span>
          </Link>
          <Link href="/questions" className={sideBarStyle.li}>
            <i className={sideBarStyle.i}>
              <FaIcons.FaQuestion />
            </i>
            <span className={sideBarStyle.span}>Preguntas</span>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;

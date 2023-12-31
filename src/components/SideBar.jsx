import React from "react";
import Image from "next/image";
import * as FaIcons from "react-icons/fa";
import sideBarStyle from "../styles/sideBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
const SideBar = () => {
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
          <Link href="/user" className={sideBarStyle.li}>
            <i className={sideBarStyle.i}>
              <FaIcons.FaUsers />
            </i>
            <span className={sideBarStyle.span}>Usuarios</span>
          </Link>

          <Link href="/categories" className={sideBarStyle.li}>
            <i className={sideBarStyle.i}>
              <FaIcons.FaClipboardList />
            </i>
            <span className={sideBarStyle.span}>Categorias</span>
          </Link>
          <Link href="/profile" className={sideBarStyle.li}>
            <i className={sideBarStyle.i}>
              <FaIcons.FaUserCircle />
            </i>
            <span className={sideBarStyle.span}>Perfil</span>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;

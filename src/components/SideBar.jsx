import React, { useState } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import sideBarStyle from "../styles/sideBar.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

const Data = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Información",
    path: "/information",
  },
];

const SideBar = () => {
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => {
    setSideBar(!sideBar);
  };

  const signOut = () => {
    router("/login");
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className={sideBarStyle.navBar}>
        <Link href="" className={sideBarStyle.menu_bars}>
          <FaIcons.FaBars onClick={showSideBar} />
        </Link>
        <div>
          <Image
            src="/images/logo_juego.png"
            alt="MULTIQUIZ"
            width={250}
            height={150}
          />
        </div>
        <Link href="/login" className={sideBarStyle.signout}>
          <FaIcons.FaSignOutAlt />
        </Link>
      </div>
      <nav
        className={
          sideBar
            ? `${sideBarStyle.nav_menu} ${sideBarStyle.active}`
            : `${sideBarStyle.nav_menu}`
        }
      >
        <ul className={sideBarStyle.nav_menu_items}>
          <div onClick={showSideBar}>
            <li className={sideBarStyle.navbar_toggle}>
              <Link href="" className={sideBarStyle.menu_bars}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Data.map((item, index) => {
              console.log(index);
              return (
                <li key={index} className={sideBarStyle.nav_text}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </div>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default SideBar;

import React, { useState } from "react";
import Layout from "@/components/Layout";
import styleIndex from "../styles/index.module.scss";
import Image from "next/image";

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/backgroundsIndex/tecnología.jpg"
  );

  var datas = {
    tecnología:
      "The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)",
    videojuegos:
      "A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.",
    psicología:
      "The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.",
    música:
      "The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.",
  };
  return (
    <Layout>
      <div className={styleIndex.row}>
        <div className={styleIndex.area}>
          <ul className={styleIndex.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={styleIndex.context}>
          <div className={styleIndex.image}>
            <Image
              src="/images/logo_juego.png"
              alt="MULTIQUIZ"
              width={330}
              height={280}
            />
          </div>
          <h1 className={styleIndex.h1}>Demuestra cuánto sabes!</h1>
        </div>
      </div>
      <br />
      <div className={styleIndex.body}>
        <div style={{ textAlign: "center", padding: "0 15% 0 15%" }}>
          <h1>Categorías</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
            provident magni nisi quasi totam. Dicta, voluptatibus ad esse
            laborum voluptas odio harum corrupti aspernatur facilis libero
            reprehenderit? Ea, doloribus ab.
          </p>
        </div>

        <div id={styleIndex.scene}>
          <div id={styleIndex.left_zone}>
            <ul className={styleIndex.list}>
              {Object.entries(datas).map(([index, val]) => (
                <li className={styleIndex.item} key={index}>
                  <input
                    type="radio"
                    id={`${styleIndex.radio_}${val}`}
                    name="basic_carousel"
                    value={val}
                    defaultChecked={index === "tecnología"}
                    onChange={() => {
                      setBackgroundImage(
                        `/images/backgroundsIndex/${index}.jpg`
                      );
                    }}
                  />
                  <label
                    htmlFor={`${styleIndex.radio_}${val}`}
                    className={`${styleIndex.label_}${index}`}
                  >
                    {index}
                  </label>
                  <div
                    className={`${styleIndex.content} ${styleIndex.content_}${index} `}
                  >
                    <h3>{val}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id={styleIndex.middle_border}></div>
          <div id={styleIndex.right_zone}>
            <div className={styleIndex.imageContainer}>
              <Image
                src={backgroundImage}
                alt="Imagen de fondo"
                width={330}
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

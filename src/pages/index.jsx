import React, { useState } from "react";
import Layout from "@/components/Layout";
import styleIndex from "../styles/index.module.scss";
import Image from "next/image";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("acercaDelJuego");
  const handleNavClick = (option) => {
    setSelectedOption(option);
  };
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/backgroundsIndex/tecnología.jpg"
  );

  var datas = {
    tecnología:
      "Explora el fascinante mundo de la innovación y la tecnología. Demuestra tu conocimiento sobre el mundo digital y compite en la categoría de Tecnología en MULTIQUIZ.",
    videojuegos:
      "Adéntrate en el emocionante mundo de los videojuegos en MULTIQUIZ. Ponte a prueba con preguntas sobre tus juegos favoritos y conviértete en un experto en esta categoría llena de diversión.",
    psicología:
      "Sumérgete en la mente humana y los misterios del comportamiento. Descifra las complejidades de la mente humana mientras respondes preguntas psicológicas en MULTIQUIZ. Explora emociones, comportamientos y teorías en esta desafiante categoría.",
    música:
      " ¡Deja que la música te guíe a través de esta divertida categoría en MULTIQUIZ! Desde géneros musicales hasta artistas icónicos, demuestra tus conocimientos musicales y supera los desafíos.",
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
      <div className={styleIndex.mainContent}>
        <div>
          <ul className={`nav justify-content-center ${styleIndex.nav}`}>
            <li className="nav-item">
              <a
                className={`nav-link ${selectedOption === "acercaDelJuego"}`}
                href="#"
                onClick={() => handleNavClick("acercaDelJuego")}
              >
                Acerca del juego
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${selectedOption === "categorias"}`}
                href="#"
                onClick={() => handleNavClick("categorias")}
              >
                Categorías
              </a>
            </li>
          </ul>
        </div>
        <br />
        {selectedOption === "acercaDelJuego" && (
          <div className={styleIndex.aboutGame}>
            <div className="row">
              <div className={`col ${styleIndex.colSideLeft}`}>
                  <Image
                    className={styleIndex.gif1}
                    src="/images/App_data_1.gif"
                    alt="ANIMATION GIF"
                    width={330}
                    height={280}
                  />
              </div>
              <div className={`col ${styleIndex.colContent}`}>
                <h1>Acerca del juego</h1>
                <p>
                  MultiQuiz es un emocionante juego que desafía tus
                  conocimientos y agilidad mental. Sumérgete en un mundo de
                  preguntas intrigantes y respuestas rápidas mientras compites
                  en una variedad de categorías, desde tecnología hasta cultura
                  general. Pon a prueba tus habilidades y demuestra que eres el
                  maestro de los trivia. Con múltiples niveles de dificultad y
                  una amplia gama de temas, MultiQuiz te ofrece una experiencia
                  de juego educativa y entretenida. ¡Únete a la diversión,
                  desafía a tus amigos y conviértete en el campeón de MultiQuiz!
                </p>
                <div className={styleIndex.gifContainer}>
                  <Image
                    className={styleIndex.gif}
                    src="/images/YOPR.gif"
                    alt="QUESTION GIF"
                    width={330}
                    height={280}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedOption === "categorias" && (
          <div className={styleIndex.body}>
            <div style={{ textAlign: "center", padding: "0 15% 0 15%" }}>
              <h2>Categorías</h2>
              <p>
                Explora un mundo de conocimientos y desafíos en las diversas
                categorías disponibles en MULTIQUIZ. Nuestras categorías abarcan
                una amplia variedad de temas. Pon a prueba tu destreza,
                aprendizaje y diversión mientras respondes preguntas y compites
                por la victoria. ¡Elige tu categoría favorita y demuestra tu
                dominio en MULTIQUIZ! A continuación se presentan algunas de las
                categorías que puedes encontrar en nuestro juego.
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
            <br />
          </div>
        )}
      </div>
      <br />
      <footer className={`footer ${styleIndex.footer}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="text-center">
                © 2023 Tu Sitio Web | Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}

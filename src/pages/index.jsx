import React, { useState } from "react";
import Layout from "@/components/Layout";
import styleIndex from "../styles/index.module.scss";
import Image from "next/image";
import Modal from "../components/Modal";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("acercaDelJuego");

  //MODAL
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => {
    setModalShow(true);
  };

  const handleHideModal = () => {
    handleNavClick("acercaDelJuego");
    setModalShow(false);
  };

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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("acercaDelJuego");
                }}
              >
                Acerca del juego
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${selectedOption === "categorias"}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("categorias");
                }}
              >
                Categorías
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal();
                }}
              >
                Manejo de datos
              </a>
            </li>
          </ul>
        </div>
        <br />
        {selectedOption === "acercaDelJuego" && (
          <div className={styleIndex.aboutGame}>
            <div className={styleIndex.row}>
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
                <h5 style={{ padding: "20px" }}>
                  MultiQuiz es un emocionante juego que desafía tus
                  conocimientos y agilidad mental. Sumérgete en un mundo de
                  preguntas intrigantes y respuestas rápidas mientras compites
                  en una variedad de categorías, desde tecnología hasta cultura
                  general. Con múltiples niveles de dificultad y una amplia gama
                  de temas, MultiQuiz te ofrece una experiencia de juego
                  educativa y entretenida. ¡Únete a la diversión, desafía a tus
                  amigos y conviértete en el campeón de MultiQuiz!
                </h5>
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
            <hr />
            <div className={styleIndex.row2}>
              <div
                className="col"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "50px",
                  color: "#4e54c8",
                  fontWeight: "bold",
                }}
              >
                Atrévete ya a demostrar tus conocimientos, pon a prueba tus
                habilidades y demuestra que eres el maestro de los trivia.
                Disponible en múltiples plataformas!.
              </div>
              <div className="col">
                {/* <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#4e54c8",
                  }}
                >
                  <b>Búscalo en:</b>
                </p> */}
                <div className={styleIndex.appsDowloads}>
                  <div className={styleIndex.playStore}>
                    <Image
                      src="/images/Play_Store.png"
                      alt="Play Store"
                      width={120}
                      height={150}
                      decoding="async"
                    />
                    <span>PLAY STORE</span>
                  </div>
                  <div className={styleIndex.appStore}>
                    <Image
                      src="/images/App_Store.png"
                      alt="App Store"
                      width={130}
                      height={150}
                      decoding="async"
                    />
                    <span>APP STORE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedOption === "categorias" && (
          <div className={styleIndex.body}>
            <div className={styleIndex.textStyle}>
              <p className={styleIndex.text}>
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
        <Modal
          show={modalShow}
          onHide={handleHideModal}
          titleHead="Manejo de datos"
        >
          <div className={styleIndex.colSideLeftData}>
            <p>
              En MULTIQUIZ, confiamos en Firebase, una plataforma de desarrollo
              de aplicaciones respaldada por Google, para gestionar y proteger
              tus datos de manera segura. Firebase se ha diseñado para
              garantizar la confidencialidad, integridad y disponibilidad de tus
              datos personales en todo momento.
            </p>
            <h6>Nuestra Apuesta por Firebase</h6>
            <p>
              Firebase es una plataforma de desarrollo de aplicaciones en la
              nube que ofrece un conjunto completo de herramientas y servicios
              para ayudarnos a almacenar, organizar y acceder a los datos
              necesarios para hacer funcionar MULTIQUIZ. Algunas de las ventajas
              más destacadas de Firebase incluyen:
            </p>
            <ul>
              <li>
                <b>Seguridad de primer nivel:</b>
                <p>
                  Firebase implementa sólidas medidas de seguridad como el
                  cifrado en tránsito y en reposo, autenticación segura y
                  controles de acceso avanzados.
                </p>
              </li>
              <li>
                <b>Bases de datos en tiempo real:</b>
                <p>
                  Utilizamos Firebase Realtime Database para mantener tus datos
                  actualizados en tiempo real, lo que permite una experiencia de
                  usuario fluida y colaborativa.
                </p>
              </li>
              <li>
                <b>Almacenamiento en la nube:</b>
                <p>
                  Firebase Cloud Storage nos permite almacenar y administrar
                  archivos y recursos multimedia de forma escalable y confiable.
                </p>
              </li>
              <li>
                <b>Autenticación simplificada:</b>
                <p>
                  Firebase Authentication facilita el inicio de sesión y la
                  gestión de usuarios, garantizando que tu información personal
                  esté protegida.
                </p>
              </li>
            </ul>
            <p>
              <b>Tu Privacidad y Tranquilidad:</b> En nombre de MULTIQUIZ, nos
              tomamos en serio la protección de tus datos y cumplimos con todas
              las regulaciones de privacidad aplicables. Firebase nos permite
              ofrecerte una experiencia segura y transparente.
            </p>
          </div>
        </Modal>
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

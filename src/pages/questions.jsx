import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import styleQuestions from "../styles/questions.module.scss";
import Modal from "../components/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import * as FaIcons from "react-icons/fa";

const Questions = () => {
  const [quest, setQuestion] = useState([]);
  const [categorie, setCategorie] = useState({});
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //Obtener id de categoria
  const router = useRouter();
  const { query: pid } = router;
  const { id } = pid;

  //OBTENER CATEGORIA
  const getCategorie = async () => {
    const db = getFirestore();
    const catRef = doc(db, "categories", id);

    try {
      const querySnap = await getDoc(catRef);
      if (querySnap.exists()) {
        const dataCategorie = querySnap.data();
        setCategorie(dataCategorie);
      } else {
        console.log("Categoria no encontrada.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //OBTENER PREGUNTAS POR CATEGORIA
  const getQuestioByCategorie = async () => {
    const db = getFirestore();
    const questionQuery = query(
      collection(db, "questions"),
      where("category_ref", "==", `/categories/${id}`)
    );
    try {
      const querySnapShot = await getDocs(questionQuery);
      const questionData = querySnapShot.docs.map((doc) => ({
        idQ: doc.id,
        ...doc.data(),
      }));
      setQuestion(questionData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getQuestioByCategorie();
      getCategorie();
    }
  }, [id]);

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <div className={styleQuestions.header}>
        <h5
          style={{
            fontSize: "40px",
          }}
        >
          Preguntas de la categoría {categorie.name}
        </h5>
        <Image
          src={categorie.image || "/images/spinner.png"}
          alt={categorie.name || ""}
          width={100}
          height={75}
          decoding="async"
        />
      </div>
      <div className={styleQuestions.modal}>
        {/* Renderiza el componente Modal */}
        <Modal
          isOpen={isModalOpen}
          header="Ingreso de nuevas preguntas"
          footer="GUARDAR"
          actionSave=""
        >
          <form>
            <div>
              <span>Pregunta: </span>
              <input
                type="text"
                id="question"
                aria-label="Pregunta"
                className="form-control"
                placeholder="Ingrese la pregunta."
              />
            </div>
            <div>
              <span>Opciones: </span>
              <div>
                <input
                  type="text"
                  id="options"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 1."
                />
                <input
                  type="text"
                  id="options"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 2."
                />
                <input
                  type="text"
                  id="options"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 3."
                />
                <input
                  type="text"
                  id="options"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 4."
                />
              </div>
            </div>
            <div>
              <span>Respuesta correcta: </span>
              <input
                type="text"
                id="answer"
                aria-label="Respuesta"
                className="form-control"
                placeholder="Ingrese la respuesta correcta."
              />
            </div>
            
            <div>
              <span>Pista: </span>
              <input
                type="text"
                id="hint"
                aria-label="Pista"
                className="form-control"
                placeholder="Ingrese la pista."
              />
            </div>
            <div>
              <span>Imágen: </span>
              <input
                type="text"
                id="image"
                aria-label="Imagen"
                className="form-control"
                placeholder="Ingrese la imagen."
              />
            </div>
          </form>
        </Modal>
      </div>
      {quest.map((data, index) => (
        <ol key={data.idQ}>
          <span className={styleQuestions.questionsStyle}>
            {index + 1}. {data.question}
            <button
              className={styleQuestions.btnHint}
              onClick={() => {
                Swal.fire(`${data.hint}`);
              }}
            >
              <FaIcons.FaLightbulb className={styleQuestions.iconHint} />
            </button>
          </span>
          {data.options.map((dataOptions, index) => {
            let equal = false;
            if (dataOptions.toLowerCase() === data.answer.toLowerCase()) {
              equal = true;
            }
            return (
              <ul key={index}>
                <li
                  className={`${equal ? styleQuestions.greenBackground : ""} ${
                    styleQuestions.optionItem
                  }`}
                >
                  {dataOptions}
                </li>
              </ul>
            );
          })}
        </ol>
      ))}
    </Layout>
  );
};

Questions.Auth = WithPrivateRoute;
export default Questions;

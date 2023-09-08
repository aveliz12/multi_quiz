import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { useRouter } from "next/router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import styleQuestions from "../styles/questions.module.scss";
import Swal from "sweetalert2";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";

const Questions = () => {
  const [quest, setQuestion] = useState([]);
  const [categorie, setCategorie] = useState({});
  const { user } = useUser();
  const { categoryId } = useUser();
  const router = useRouter();

  //OBTENER CATEGORIA
  const getCategorie = async () => {
    const db = getFirestore();
    const catRef = doc(db, "categories", categoryId);

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
      where("category_ref", "==", `/categories/${categoryId}`)
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

  //EDITAR PREGUNTA
  const updateQuesiont = (id) => {
    router.push({
      pathname: "/updateQuestion/[id]",
      query: { id },
    });
  };

  //ELIMINAR PREGUNTA
  const deleteQuestion = async (idQuestion) => {
    try {
      const db = getFirestore();
      const refQuestion = doc(db, "questions", idQuestion);
      await deleteDoc(refQuestion);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (idQuestion) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás volver atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6667AB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteQuestion(idQuestion);
        getQuestioByCategorie();
        Swal.fire("Eliminado!", "Pregunta eliminada correctamente.", "success");
      }
    });
  };

  useEffect(() => {
    if (categoryId) {
      getCategorie();
      getQuestioByCategorie();
    }
  }, [categoryId]);

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
      <div style={{ padding: "0 0 10px 15px" }}>
        <Link href="/newQuestion" className={styleQuestions.btnAdd}>
          <FaIcons.FaPlus style={{ marginRight: "8px", marginLeft: "8px" }} />
          CREAR PREGUNTAS
        </Link>
      </div>
      {quest.map((data, index) => (
        <ol key={data.idQ}>
          <span className={styleQuestions.questionsStyle}>
            {index + 1}. {data.question}
            <div className="dropdown">
              <button
                className={styleQuestions.btnList}
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaIcons.FaPencilAlt className={styleQuestions.iconList} />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <button
                  className={`dropdown-item ${styleQuestions.btnHint}`}
                  onClick={() => {
                    Swal.fire(`${data.hint}`);
                  }}
                >
                  <FaIcons.FaLightbulb />
                </button>
                <button
                  className={`dropdown-item ${styleQuestions.btnDelete}`}
                  onClick={() => handleDelete(data.idQ)}
                >
                  <FaIcons.FaTrashAlt />
                </button>
                <button
                  className={`dropdown-item ${styleQuestions.btnEdit}`}
                  onClick={() => updateQuesiont(data.idQ)}
                >
                  <FaIcons.FaEdit />
                </button>
              </ul>
            </div>
          </span>
          {Object.values(data.options).map((dataOptions, index) => {
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

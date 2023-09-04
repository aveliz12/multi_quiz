import Link from "next/link";
import React from "react";
import * as FaIcons from "react-icons/fa";
import styleQuestions from "../styles/questions.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useUser } from "@/components/UserContext";

const NewQuestion = () => {
  const {user} = useUser();
  const router = useRouter();
  //Obtener el id de la categoria
  const {
    query: { id },
  } = router;
  const idCategorie = id;
  //Nueva pregunta

  const newQuestion = async (question) => {
    try {
      const db = getFirestore();
      const questionRef = collection(db, "questions");

      const newDoc = await addDoc(questionRef, question);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Pregunta creada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/questions");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al crear pregunta.",
      });
    }
  };
  //VALIDACION PARA FORMULARIO
  const formik = useFormik({
    initialValues: {
      answer: "",
      category_ref: `/categories/${idCategorie}`,
      hint: "",
      image: "",
      options: {
        0: "",
        1: "",
        2: "",
        3: "",
      },
      question: "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("La pregunta es requerida."),
      options: Yup.array().required("La opción es requerida."),
      answer: Yup.string().required("La respuesta es requerida."),
      hint: Yup.string().required("La pista es requerida."),
      image: Yup.string()
        .url("Ingrese un enlce correcto")
        .required("El enlace de la imagen es requerido."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <div className="container">
        <h5
          style={{
            fontSize: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Nueva Categoria
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div
            className="modal-body"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Pregunta: </span>
              <input
                type="text"
                id="question"
                aria-label="Pregunta"
                className="form-control"
                placeholder="Ingrese la pregunta."
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Opciones: </span>
              <div>
                <input
                  type="text"
                  id="options[0]"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 1."
                  value={formik.values.options[0]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  type="text"
                  id="options[1]"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 2."
                  value={formik.values.options[1]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  type="text"
                  id="options[2]"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 3."
                  value={formik.values.options[2]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <input
                  type="text"
                  id="options[3]"
                  aria-label="Opciones"
                  className="form-control"
                  placeholder="Ingrese la opción 4."
                  value={formik.values.options[3]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Respuesta correcta: </span>
              <input
                type="text"
                id="answer"
                aria-label="Respuesta"
                className="form-control"
                placeholder="Ingrese la respuesta correcta."
                value={formik.values.answer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Pista: </span>
              <input
                type="text"
                id="hint"
                aria-label="Pista"
                className="form-control"
                placeholder="Ingrese la pista."
                value={formik.values.hint}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Imágen: </span>
              <input
                type="text"
                id="image"
                aria-label="Imagen"
                className="form-control"
                placeholder="Ingrese la url de la imagen."
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="modal-footer">
            <input
              type="submit"
              className={styleQuestions.btnSave}
              value="GUARDAR"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewQuestion;

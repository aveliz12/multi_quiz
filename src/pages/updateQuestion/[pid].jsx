import Layout from "@/components/Layout";
import { useUser } from "@/components/UserContext";
import React, { useEffect, useState } from "react";
import styleQuestions from "../../styles/questions.module.scss";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";

const UpdateQuestion = () => {
  const { user } = useUser();
  const { categoryId } = useUser();
  const router = useRouter();
  const {
    query: { pid },
  } = router;
  //ESTADOS
  const [categorie, setCategorie] = useState({});
  const [questionData, setQuestionData] = useState([]);

  //OBTENER CATEGORIA
  const getCategorie = async () => {
    const db = getFirestore();
    const catRef = doc(db, "categories", categoryId);

    try {
      const queryCat = await getDoc(catRef);
      if (queryCat.exists()) {
        const dataCat = queryCat.data();
        setCategorie(dataCat);
      } else {
        console.log("Error al obtener categoria.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GETQUESTIONS
  const getQuestion = async () => {
    const db = getFirestore();
    const questionRef = doc(db, "questions", pid);

    try {
      const dataQuestion = await getDoc(questionRef);
      if (dataQuestion.exists()) {
        setQuestionData(dataQuestion.data());
      } else {
        console.log("La pregunta no existe.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Validation Schema para questions
  const validationSchema = Yup.object({
    question: Yup.string().required("La pregunta es requerida."),
    options: Yup.object().shape({
      0: Yup.string().required("La primera opción es requerida."),
      1: Yup.string().required("La segunda opción es requerida."),
      2: Yup.string().required("La tercera opción es requerida."),
      3: Yup.string().required("La cuarta opción es requerida."),
    }),
    answer: Yup.string().required("La respuesta es requerida."),
    hint: Yup.string().required("La pista es requerida."),
    image: Yup.string()
      .url("Ingrese un enlce correcto")
      .required("El enlace de la imagen es requerido."),
  });

  //UpdateQuestions
  const handleUpdateQuestions = async (question) => {
    try {
      const db = getFirestore();
      const questionRef = doc(db, "questions", pid);

      await updateDoc(questionRef, question);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Pregunta actualizada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/questions");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pid !== undefined) {
      getQuestion();
      getCategorie();
    }
  }, [pid, categoryId]);

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <div>
        <h5
          style={{
            fontSize: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Actualizar Pregunta
        </h5>
      </div>
      <div>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            answer: questionData.answer || "",
            category_ref: questionData.category_ref || "",
            hint: questionData.hint || "",
            image: questionData.image || "",
            options: questionData.options || { 0: "", 1: "", 2: "", 3: "" },
            question: questionData.question || "",
          }}
          onSubmit={(values) => handleUpdateQuestions(values)}
        >
          {(props) => {
            return (
              <form
                onSubmit={props.handleSubmit}
                className="container"
                style={{ width: "50%" }}
              >
                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                  <div className={styleQuestions.inputStyle}>
                    <span className={styleQuestions.span}>Pregunta: </span>
                    <input
                      type="text"
                      id="question"
                      aria-label="Pregunta"
                      className="form-control"
                      placeholder="Ingrese la pregunta."
                      value={props.values.question}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.question && props.errors.question ? (
                    <div className={styleQuestions.errorStyle}>
                      <p className={styleQuestions.titleErrorStyle}>Error: </p>
                      <p>{props.errors.question}</p>
                    </div>
                  ) : null}
                  <div className={styleQuestions.inputStyle}>
                    <span className={styleQuestions.span}>Categoría: </span>
                    <input
                      type="text"
                      id="category_ref"
                      aria-label="Categoría"
                      className="form-control"
                      disabled
                      value={categorie.name || ""}
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
                        value={props.values.options[0]}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <input
                        type="text"
                        id="options[1]"
                        aria-label="Opciones"
                        className="form-control"
                        placeholder="Ingrese la opción 2."
                        value={props.values.options[1]}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <input
                        type="text"
                        id="options[2]"
                        aria-label="Opciones"
                        className="form-control"
                        placeholder="Ingrese la opción 3."
                        value={props.values.options[2]}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <input
                        type="text"
                        id="options[3]"
                        aria-label="Opciones"
                        className="form-control"
                        placeholder="Ingrese la opción 4."
                        value={props.values.options[3]}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.options && props.errors.options ? (
                      <div className={styleQuestions.errorStyle}>
                        <p className={styleQuestions.titleErrorStyle}>
                          Error:{" "}
                        </p>
                        <p>{props.errors.options}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className={styleQuestions.inputStyle}>
                    <span className={styleQuestions.span}>
                      Respuesta correcta:{" "}
                    </span>
                    <input
                      type="text"
                      id="answer"
                      aria-label="Respuesta"
                      className="form-control"
                      placeholder="Ingrese la respuesta correcta."
                      value={props.values.answer}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.answer && props.errors.answer ? (
                    <div className={styleQuestions.errorStyle}>
                      <p className={styleQuestions.titleErrorStyle}>Error: </p>
                      <p>{props.errors.answer}</p>
                    </div>
                  ) : null}
                  <div className={styleQuestions.inputStyle}>
                    <span className={styleQuestions.span}>Pista: </span>
                    <input
                      type="text"
                      id="hint"
                      aria-label="Pista"
                      className="form-control"
                      placeholder="Ingrese la pista."
                      value={props.values.hint}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.hint && props.errors.hint ? (
                    <div className={styleQuestions.errorStyle}>
                      <p className={styleQuestions.titleErrorStyle}>Error: </p>
                      <p>{props.errors.hint}</p>
                    </div>
                  ) : null}
                  <div className={styleQuestions.inputStyle}>
                    <span className={styleQuestions.span}>Imágen: </span>
                    <input
                      type="text"
                      id="image"
                      aria-label="Imagen"
                      className="form-control"
                      placeholder="Ingrese la url de la imagen."
                      value={props.values.image}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.image && props.errors.image ? (
                    <div className={styleQuestions.errorStyle}>
                      <p className={styleQuestions.titleErrorStyle}>Error: </p>
                      <p>{props.errors.image}</p>
                    </div>
                  ) : null}
                </div>
                <div className={styleQuestions.divBtnSave}>
                  <input
                    type="submit"
                    className={styleQuestions.btnSave}
                    value="ACTUALIZAR"
                  />
                  <Link href="/questions" className={styleQuestions.btnBack}>
                    <FaIcons.FaStepBackward
                      style={{ marginRight: "8px", marginLeft: "8px" }}
                    />
                    VOLVER
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default UpdateQuestion;

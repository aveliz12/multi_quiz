import Link from "next/link";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import styleQuestions from "../styles/questions.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useUser } from "@/components/UserContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const NewQuestion = () => {
  const { user } = useUser();
  const { categoryId } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  //Cargar imagen a storage
  const uploadImageQuestion = async () => {
    try {
      if (!selectedImage) {
        throw new Error("Debe seleccionar una imagen.");
      }

      const storage = getStorage();
      const storageRef = ref(storage, `/image_questions/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);

      //Obtener el url de la imagen
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const newQuestion = async (question) => {
    try {
      let imageUrl = "";

      if (selectedImage) {
        imageUrl = await uploadImageQuestion();
      }

      const questionData = {
        category_ref: question.category_ref,
        question: question.question,
        options: question.options,
        answer: question.answer,
        hint: question.hint,
        image: imageUrl,
      };

      const db = getFirestore();
      const questionRef = collection(db, "questions");

      await addDoc(questionRef, questionData);
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
      category_ref: `/categories/${categoryId}`,
      hint: "",
      options: ["", "", "", ""],
      question: "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("La pregunta es requerida."),
      options: Yup.array()
        .of(Yup.string())
        .test(
          "all-options-filled",
          "Debes completar las 4 opciones.",
          (value) => value.filter((option) => !!option).length === 4
        ),
      answer: Yup.string().required("La respuesta es requerida."),
      hint: Yup.string().required("La pista es requerida."),
    }),
    onSubmit: (values) => {
      newQuestion(values);
    },
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
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
          Nueva Pregunta
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
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
            {formik.touched.question && formik.errors.question ? (
              <div className={styleQuestions.errorStyle}>
                <p className={styleQuestions.titleErrorStyle}>Error: </p>
                <p>{formik.errors.question}</p>
              </div>
            ) : null}
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Opciones: </span>
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <input
                    type="text"
                    id={`options[${index}]`}
                    aria-label="Opciones"
                    className="form-control"
                    placeholder={`Ingrese la opción ${index + 1}.`}
                    value={formik.values.options[index]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              ))}
              {formik.touched.options && formik.errors.options ? (
                <div className={styleQuestions.errorStyle}>
                  <p className={styleQuestions.titleErrorStyle}>Error: </p>
                  <p>{formik.errors.options}</p>
                </div>
              ) : null}
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
            {formik.touched.answer && formik.errors.answer ? (
              <div className={styleQuestions.errorStyle}>
                <p className={styleQuestions.titleErrorStyle}>Error: </p>
                <p>{formik.errors.answer}</p>
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
                value={formik.values.hint}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.hint && formik.errors.hint ? (
              <div className={styleQuestions.errorStyle}>
                <p className={styleQuestions.titleErrorStyle}>Error: </p>
                <p>{formik.errors.hint}</p>
              </div>
            ) : null}
            <div className={styleQuestions.inputStyle}>
              <span className={styleQuestions.span}>Imágen: </span>
              <input
                type="file"
                id="image"
                accept=".jpg, .jpeg, .png"
                aria-label="Imagen"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className={styleQuestions.divBtnSave}>
            <input
              type="submit"
              className={styleQuestions.btnSave}
              value="GUARDAR"
            />
            <Link href="/questions" className={styleQuestions.btnBack}>
              <FaIcons.FaStepBackward
                style={{ marginRight: "8px", marginLeft: "8px" }}
              />
              VOLVER
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewQuestion;

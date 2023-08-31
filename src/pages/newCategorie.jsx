import Layout from "@/components/Layout";
import React from "react";
import { useUser } from "@/components/UserContext";
import styleNewCat from "../styles/categories.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginStyle from "../styles/login.module.scss";

import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
const NewCategorie = () => {
  const { user } = useUser();
  const router = useRouter();

  //Validación del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      image: Yup.string()
        .url("Ingrese un enlce correcto")
        .required("El enlace de la imagen es requerido."),
      description: Yup.string().required("La descripción es requerida."),
    }),
    onSubmit: (values) => {
      newCategorie(values);
    },
  });

  //Nueva Categoria
  const newCategorie = async (data) => {
    try {
      const db = getFirestore();
      await addDoc(collection(db, "categories"), data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Categoria creada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/categories");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este correo ya está en uso.",
      });
    }
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
          Nueva Categoria
        </h5>
        <form onSubmit={formik.handleSubmit} className={styleNewCat.form}>
          <div className={styleNewCat.inputName}>
            <span className={styleNewCat.span}>Nombre: </span>
            <input
              type="text"
              id="name"
              aria-label="Nombre"
              className="form-control"
              placeholder="Ingrese el nombre."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className={styleNewCat.errorStyle}>
              <p className={styleNewCat.titleErrorStyle}>Error: </p>
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
          <div className={styleNewCat.inputImage}>
            <span className={styleNewCat.span}>Imagen: </span>
            <input
              type="text"
              id="image"
              aria-label="Imagen"
              className="form-control"
              placeholder="Ingrese el enlace de la imagen."
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.image && formik.errors.image ? (
            <div className={styleNewCat.errorStyle}>
              <p className={styleNewCat.titleErrorStyle}>Error: </p>
              <p>{formik.errors.image}</p>
            </div>
          ) : null}
          <div className={styleNewCat.inputDesc}>
            <span className={styleNewCat.span}>Descripción: </span>
            <input
              type="text"
              id="description"
              aria-label="Descripción"
              className="form-control"
              placeholder="Ingrese la descripción"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className={styleNewCat.errorStyle}>
              <p className={styleNewCat.titleErrorStyle}>Error: </p>
              <p>{formik.errors.description}</p>
            </div>
          ) : null}
          <input
            type="submit"
            className={styleNewCat.btnNewCat}
            value="CREAR CATEGORIA"
          />
        </form>
      </div>
    </Layout>
  );
};

export default NewCategorie;

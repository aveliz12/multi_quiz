import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useUser } from "@/components/UserContext";
import styleNewCat from "../styles/categories.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewCategorie = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  //Validación del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      description: Yup.string().required("La descripción es requerida."),
    }),
    onSubmit: (values) => {
      newCategorie(values);
    },
  });

  //Cargar imagen a Storage
  const uploadImage = async () => {
    try {
      if (!selectedImage) {
        throw new Error("Debe seleccionar una imagen.");
      }
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `/image_categories/${selectedImage.name}`
      );
      await uploadBytes(storageRef, selectedImage);

      //Obtener la url de la imagen
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  //Nueva Categoria
  const newCategorie = async (data) => {
    try {
      let imageUrl = "";

      if (selectedImage) {
        imageUrl = await uploadImage();
      }

      const categoryData = {
        name: data.name,
        image: imageUrl,
        description: data.description,
      };
      const db = getFirestore();
      await addDoc(collection(db, "categories"), categoryData);

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
        text: "Error al crear categoría.",
      });
    }
  };
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
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png"
              aria-label="Imagen"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
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

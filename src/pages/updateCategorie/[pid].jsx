import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useUser } from "@/components/UserContext";
import styleUpdateCategories from "../../styles/categories.module.scss";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import Swal from "sweetalert2";

import * as Yup from "yup";
const UpdateCategorie = () => {
  const { user } = useUser();
  const router = useRouter();
  const [categorie, setCategorie] = useState({});
  const {
    query: { pid },
  } = router;

  //Schema de validación
  const validatioSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    image: Yup.string()
      .url("Ingrese un enlce correcto")
      .required("El enlace de la imagen es requerido."),
    description: Yup.string().required("La descripción es requerida."),
  });

  //ACTUALIZAR CATEGORIA
  const handleUpdateCategorie = async (cat) => {
    try {
      const db = getFirestore();
      const catRef = doc(db, "categories", pid);

      await updateDoc(catRef, cat);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Categoría actualizada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pid !== undefined) {
      const getDataCategorieUpdate = async () => {
        const db = getFirestore();
        const cateRef = doc(db, "categories", pid);
        try {
          const dataCategorie = await getDoc(cateRef);
          if (dataCategorie.exists()) {
            setCategorie(dataCategorie.data());
          } else {
            console.log("Categoria no encontrada.");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getDataCategorieUpdate();
    }
  }, [pid]);

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
          Actualizar Categoria
        </h5>
      </div>
      <div>
        <Formik
          validationSchema={validatioSchema}
          enableReinitialize
          initialValues={{
            name: categorie.name || "",
            image: categorie.image || "",
            description: categorie.description || "",
          }}
          onSubmit={(values) => handleUpdateCategorie(values)}
        >
          {(props) => {
            return (
              <form
                onSubmit={props.handleSubmit}
                className={styleUpdateCategories.form}
              >
                <div className={styleUpdateCategories.inputName}>
                  <span className={styleUpdateCategories.span}>Nombre: </span>
                  <input
                    type="text"
                    id="name"
                    aria-label="Nombre"
                    className="form-control"
                    placeholder="Ingrese el nombre."
                    value={props.values.name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.name && props.errors.name ? (
                  <div className={styleUpdateCategories.errorStyle}>
                    <p className={styleUpdateCategories.titleErrorStyle}>
                      Error:
                    </p>
                    <p>{props.errors.name}</p>
                  </div>
                ) : null}
                <div className={styleUpdateCategories.inputImage}>
                  <span className={styleUpdateCategories.span}>Imagen: </span>
                  <input
                    type="text"
                    id="image"
                    aria-label="Imagen"
                    className="form-control"
                    placeholder="Ingrese el enlace de la imagen."
                    value={props.values.image}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.image && props.errors.image ? (
                  <div className={styleUpdateCategories.errorStyle}>
                    <p className={styleUpdateCategories.titleErrorStyle}>
                      Error:
                    </p>
                    <p>{props.errors.image}</p>
                  </div>
                ) : null}
                <div className={styleUpdateCategories.inputDesc}>
                  <span className={styleUpdateCategories.span}>
                    Descripción:{" "}
                  </span>
                  <input
                    type="text"
                    id="description"
                    aria-label="Descripción"
                    className="form-control"
                    placeholder="Ingrese la descripción"
                    value={props.values.description}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.description && props.errors.description ? (
                  <div className={styleUpdateCategories.errorStyle}>
                    <p className={styleUpdateCategories.titleErrorStyle}>
                      Error:
                    </p>
                    <p>{props.errors.description}</p>
                  </div>
                ) : null}
                <input
                  type="submit"
                  className={styleUpdateCategories.btnNewCat}
                  value="ACTUALIZAR CATEGORIA"
                />
              </form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default UpdateCategorie;

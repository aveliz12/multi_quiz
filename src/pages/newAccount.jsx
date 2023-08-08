import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // Añade esta importación
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import loginStyle from "../styles/login.module.scss";

const NewAccount = () => {
  const router = useRouter();

  //Validación del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      user_name: "",
      pass: "",
      role: "User",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es requerido."),
      apellido: Yup.string().required("El apellido es requerido."),
      correo: Yup.string()
        .email("El correo no es válido.")
        .required("El correo es requerido."),
      user_name: Yup.string().required("El nombre de usuario es requerido."),
      pass: Yup.string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres.")
        .required("La contraseña es requerido."),
    }),
    onSubmit: (values) => {
      newAccount(values);
    },
  });

  //Registrar
  const newAccount = (data) => {
    createUserWithEmailAndPassword(auth, data.correo, data.pass)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const db = getFirestore();

        // Agregar el usuario a la colección "users"
        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);
        setDoc(userDoc, {
          nombre: data.nombre,
          apellido: data.apellido,
          user_name: data.user_name,
          correo: data.correo,
          password: data.pass,
          role: data.role,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario crearo correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear usuario",
        });
        console.log(err);
      });
  };

  return (
    <div className={loginStyle.allPage}>
      <Layout>
        <div className="card">
          <h1 style={{ textAlign: "center" }}>Registro de nuevo usuario</h1>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="input-group" style={{ marginBottom: "10px" }}>
                <span className="input-group-text">Nombre</span>
                <input
                  id="nombre"
                  type="text"
                  aria-label="Nombre"
                  className="form-control"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="input-group-text">Apellido</span>
                <input
                  id="apellido"
                  type="text"
                  aria-label="Apellido"
                  className="form-control"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.nombre && formik.touched.nombre ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : formik.errors.apellido && formik.touched.apellido ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}
              <div className="input-group" style={{ marginBottom: "10px" }}>
                <span className="input-group-text">Correo electrónico</span>
                <input
                  id="correo"
                  type="email"
                  aria-label="Correo electrónico"
                  className="form-control"
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.correo && formik.errors.correo ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.correo}</p>
                </div>
              ) : null}
              <div className="input-group" style={{ marginBottom: "10px" }}>
                <span className="input-group-text">Nombre de usuario</span>
                <input
                  id="user_name"
                  type="text"
                  aria-label="Nombre de usuario"
                  className="form-control"
                  value={formik.values.user_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.user_name}</p>
                </div>
              ) : null}
              <div className="input-group" style={{ marginBottom: "10px" }}>
                <span className="input-group-text">Contraseña</span>
                <input
                  id="pass"
                  type="password"
                  aria-label="Contraseña"
                  className="form-control"
                  value={formik.values.pass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.pass && formik.errors.pass ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.pass}</p>
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="CREAR CUENTA"
                />
                <a href="login">Ya tengo una cuenta</a>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NewAccount;

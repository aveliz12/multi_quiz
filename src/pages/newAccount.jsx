import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // Añade esta importación
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import loginStyle from "../styles/login.module.scss";
import WithPrivateRoute from "../components/WithPrivateRoute";

const NewAccount = () => {
  const router = useRouter();

  //Validación del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      user_name: "",
      password: "",
      role: "user",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido."),
      last_name: Yup.string().required("El apellido es requerido."),
      email: Yup.string()
        .email("El correo no es válido.")
        .required("El correo es requerido."),
      user_name: Yup.string().required("El nombre de usuario es requerido."),
      password: Yup.string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres.")
        .required("La contraseña es requerido."),
    }),
    onSubmit: (values) => {
      newAccount(values);
    },
  });

  //Registrar
  const newAccount = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const db = getFirestore();

        // Agregar el usuario a la colección "users"
        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);
        setDoc(userDoc, {
          name: data.name,
          last_name: data.last_name,
          user_name: data.user_name,
          email: data.email,
          //password: data.password,
          role: data.role,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario crearo correctamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/user");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Este correo ya está en uso.",
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
                  id="name"
                  type="text"
                  aria-label="Nombre"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="input-group-text">Apellido</span>
                <input
                  id="last_name"
                  type="text"
                  aria-label="Apellido"
                  className="form-control"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.name && formik.touched.name ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : formik.errors.last_name && formik.touched.last_name ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.last_name}</p>
                </div>
              ) : null}
              <div className="input-group" style={{ marginBottom: "10px" }}>
                <span className="input-group-text">Correo electrónico</span>
                <input
                  id="email"
                  type="email"
                  aria-label="Correo electrónico"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.email}</p>
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
                  id="password"
                  type="password"
                  aria-label="Contraseña"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className={loginStyle.errorStyle}>
                  <p className={loginStyle.titleErrorStyle}>Error</p>
                  <p>{formik.errors.password}</p>
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
                  className={loginStyle.btnNewAccount}
                  value="CREAR CUENTA"
                />
                <a href="user" className={loginStyle.link}>
                  REGRESAR
                </a>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};
NewAccount.Auth = WithPrivateRoute;

export default NewAccount;

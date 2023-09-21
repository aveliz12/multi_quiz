import React, { useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import srtyleProfile from "../styles/profile.module.scss";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { updateEmail, updatePassword } from "firebase/auth";

const Profile = () => {
  const { user } = useUser();
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido."),
    last_name: Yup.string().required("El apellido es requerido."),
    email: Yup.string()
      .email("El correo no es válido.")
      .required("El correo es requerido."),
    user_name: Yup.string().required("El nombre de usuario es requerido."),
  });
  const validationSchemaPasword = Yup.object({
    password: Yup.string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres.")
      .required("La contraseña es requerida."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir.")
      .required("Confirmar la contraseña es requerido."),
  });

  const handleUpdateProfile = async (usr) => {
    const db = getFirestore();
    const profileRef = doc(db, "users", user.id);
    try {
      await updateDoc(profileRef, usr);

      if (usr.email) {
        await updateEmail(auth.currentUser, usr.email);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Perfil actualizado correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al actualizar datos.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const updatePasswordInAuth = async (newPass) => {
    try {
      let newPassword = "";
      console.log(newPass);
      if (newPass !== null) {
        newPassword = newPass.password;
      }
      await updatePassword(auth.currentUser, newPassword);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contraseña actualizada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al actualizar contraseña.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <h5
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "40px",
        }}
      >
        Perfil
      </h5>
      <div className="container">
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            name: user?.name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            user_name: user?.user_name || "",
          }}
          onSubmit={(values) => {
            handleUpdateProfile(values);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={props.values.name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="name">Nombre</label>
                </div>
                {props.errors.name && props.touched.name ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.name}</p>
                  </div>
                ) : null}
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="last_name"
                    type="text"
                    className="form-control"
                    value={props.values.last_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="last_name">Apellido</label>
                </div>
                {props.errors.last_name && props.touched.last_name ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.last_name}</p>
                  </div>
                ) : null}
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                {props.touched.email && props.errors.email ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.email}</p>
                  </div>
                ) : null}
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="user_name"
                    type="text"
                    className="form-control"
                    value={props.values.user_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="user_name">Nombre de usuario</label>
                </div>
                {props.touched.user_name && props.errors.user_name ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.user_name}</p>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    type="submit"
                    className={srtyleProfile.btnUpdate}
                    value="ACTUALIZAR DATOS"
                  />
                </div>
              </form>
            );
          }}
        </Formik>
        <hr />
        <Formik
          validationSchema={validationSchemaPasword}
          enableReinitialize
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            updatePasswordInAuth(values);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                {props.touched.password && props.errors.password ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.password}</p>
                  </div>
                ) : null}
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                </div>
                {props.touched.confirmPassword &&
                props.errors.confirmPassword ? (
                  <div className={srtyleProfile.errorStyle}>
                    <p className={srtyleProfile.titleErrorStyle}>Error</p>
                    <p>{props.errors.confirmPassword}</p>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    type="submit"
                    className={srtyleProfile.btnUpdate}
                    value="ACTUALIZAR CONTRASEÑA"
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};
Profile.Auth = WithPrivateRoute;

export default Profile;

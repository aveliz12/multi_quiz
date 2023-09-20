import React, { useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import srtyleProfile from "../styles/profile.module.scss";
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
            console.log(values);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="name"
                    type="text"
                    aria-label="Nombre"
                    className="form-control"
                    placeholder="Nombre"
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
                    aria-label="Apellido"
                    className="form-control"
                    placeholder="Apellido"
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
                    aria-label="Correo electrónico"
                    className="form-control"
                    placeholder="Correo electrónico"
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
                    aria-label="Nombre de usuario"
                    className="form-control"
                    placeholder="Nombre de usuario"
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
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="submit"
                    className={srtyleProfile.btnUpdate}
                    value="ACTUALIZAR DATOS"
                  />
                </div>
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="password"
                    type="password"
                    aria-label="Contraseña"
                    className="form-control"
                    placeholder="Contraseña"
                    // onChange={props.handleChange}
                    // onBlur={props.handleBlur}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <div className="form-floating" style={{ marginBottom: "10px" }}>
                  <input
                    id="password"
                    type="password"
                    aria-label="Contraseña"
                    className="form-control"
                    placeholder="Contraseña"
                  />
                  <label htmlFor="password">Confirmar contraseña</label>
                </div>
                <div>
                  <button className={srtyleProfile.btnUpdate}>ACTUALIZAR CONTRASEÑA</button>
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

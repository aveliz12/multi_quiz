import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import srtyleProfile from "../styles/profile.module.scss";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { updateEmail, sendPasswordResetEmail } from "firebase/auth";

const Profile = () => {
  const { user, setUser } = useUser();
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido."),
    last_name: Yup.string().required("El apellido es requerido."),
    user_name: Yup.string().required("El nombre de usuario es requerido."),
  });

  const handleUpdateProfile = async (usr) => {
    const db = getFirestore();
    const profileRef = doc(db, "users", user.id);
    try {
      await updateDoc(profileRef, usr);

      setUser({ ...user, ...usr });
      const updateUserLocalStorage = { ...user, ...usr };
      localStorage.setItem("userData", JSON.stringify(updateUserLocalStorage));

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
  const resetPassword = async () => {
    try {
      if (auth.currentUser) {
        await sendPasswordResetEmail(auth, user.email);
        Swal.fire(
          "Correo de restablecimiento de contraseña enviado con éxito",
          "Por favor, revise su correo electrónico para restablecer su contraseña.",
          "success"
        );
      } else {
        // El usuario no está autenticado, muestra un mensaje de error
        Swal.fire(
          "Error",
          "Debes iniciar sesión antes de restablecer la contraseña.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error al enviar el correo de restablecimiento de contraseña",
        "Por favor, intente nuevamente más tarde.",
        "error"
      );
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
                    disabled
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
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
                <div>
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
        <button
          className={srtyleProfile.linkPass}
          onClick={() => resetPassword()}
        >
          Actualizar Contraseña
        </button>
      </div>
    </Layout>
  );
};
Profile.Auth = WithPrivateRoute;

export default Profile;

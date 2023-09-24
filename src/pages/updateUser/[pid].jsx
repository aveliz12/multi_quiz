import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styleUpdateUser from "../../styles/users.module.scss";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const [user, setUser] = useState([]);
  const [userUpdate, setuserUpdate] = useState({});
  //Obtener el id del usuario
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  //Esquema de validacion
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido."),
    last_name: Yup.string().required("El apellido es requerido."),
    email: Yup.string()
      .email("El correo no es válido.")
      .required("El correo es requerido."),
    user_name: Yup.string().required("El nombre de usuario es requerido."),
    // password: Yup.string()
    //   .min(8, "La contraseña debe tener mínimo 8 caracteres.")
    //   .required("La contraseña es requerido."),
  });

  //Actualizar usuarios
  const handleUpdateUsers = async (user) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", pid);

      await updateDoc(userRef, user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario actualizado correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/user");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storeUserData = localStorage.getItem("userData");
    const userData = storeUserData ? JSON.parse(storeUserData) : null;

    setUser(userData);

    if (pid !== undefined) {
      const getDataUserUpdate = async () => {
        if (pid) {
          const db = getFirestore();
          const userRef = doc(db, "users", pid);

          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              setuserUpdate(userDoc.data());
            } else {
              console.log("Usuario no encontrado.");
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
      getDataUserUpdate();
    }
  }, [pid]);

  return (
    <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
      <div className={styleUpdateUser.form}>
        <h2 className={styleUpdateUser.titleUpdate}>Editar Usuario</h2>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            name: userUpdate.name || "",
            last_name: userUpdate.last_name || "",
            email: userUpdate.email || "",
            user_name: userUpdate.user_name || "",
            //password: userUpdate.password || "",
          }}
          onSubmit={(values) => {
            handleUpdateUsers(values);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="input-group" style={{ marginBottom: "10px" }}>
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
                </div>
                {props.errors.name && props.touched.name ? (
                  <div className={styleUpdateUser.errorStyle}>
                    <p className={styleUpdateUser.titleErrorStyle}>Error</p>
                    <p>{props.errors.name}</p>
                  </div>
                ) : props.errors.last_name && props.touched.last_name ? (
                  <div className={styleUpdateUser.errorStyle}>
                    <p className={styleUpdateUser.titleErrorStyle}>Error</p>
                    <p>{props.errors.last_name}</p>
                  </div>
                ) : null}
                <div className="input-group" style={{ marginBottom: "10px" }}>
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
                </div>
                {props.touched.email && props.errors.email ? (
                  <div className={styleUpdateUser.errorStyle}>
                    <p className={styleUpdateUser.titleErrorStyle}>Error</p>
                    <p>{props.errors.email}</p>
                  </div>
                ) : null}
                <div className="input-group" style={{ marginBottom: "10px" }}>
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
                </div>
                {props.touched.user_name && props.errors.user_name ? (
                  <div className={styleUpdateUser.errorStyle}>
                    <p className={styleUpdateUser.titleErrorStyle}>Error</p>
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
                    className={styleUpdateUser.btnNewAccount}
                    value="ACTUALIZAR"
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

export default UpdateUser;

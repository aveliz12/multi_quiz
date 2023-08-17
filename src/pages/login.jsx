import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import loginStyle from "../styles/login.module.scss";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Login = () => {
  const router = useRouter();

  //Validación del formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo no es válido")
        .required("Ingresar el correo electrónico."),
      pass: Yup.string().required("La contraseña es obligatoria."),
    }),
    onSubmit: (values) => {
      try {
        signInWithEmailAndPassword(auth, values.email, values.pass)
          .then(async (resp) => {
            if (resp.user) {
              const userUid = resp.user.uid;

              const db = getFirestore();
              const userDocRef = doc(db, "users", userUid);
              const userSnapShot = await getDoc(userDocRef);

              if (userSnapShot.exists()) {
                const userData = userSnapShot.data();
                userData.id = userUid;
                localStorage.setItem("userData", JSON.stringify(userData));

                router.push("/user");
              } else {
                console.log("El usuario no existe.");
              }
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Credenciales incorrectas",
            });
          });
      } catch (error) {
        console.log("Error al ingresar. ", error);
      }
    },
  });
  return (
    <div className={loginStyle.allPage}>
      <Layout>
        <div className={loginStyle.container_login}>
          <div className="card" style={{ width: "70vh" }}>
            <div
              className="card-header"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              LOGIN
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label className={loginStyle.title}>Email: </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      aria-describedby="basic-addon1"
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
                  <label className={loginStyle.title}>Contraseña: </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      **
                    </span>
                    <input
                      id="pass"
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      aria-describedby="basic-addon1"
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
                </div>
                <div className={loginStyle.btnLogin}>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="INICIAR SESIÓN"
                  />
                  <a href="newAccount">Crear nueva cuenta</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;

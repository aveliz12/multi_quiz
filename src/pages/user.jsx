import Layout from "@/components/Layout";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { deleteUser as deleteUserAuth } from "firebase/auth";
import Modal from "../components/Modal";
import styleUsers from "../styles/users.module.scss";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";

const User = () => {
  const { user } = useUser();
  const [usr, setUsr] = useState({});
  const [users, setUsers] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [ranked, setRanked] = useState([]);
  const [filteredRanked, setFilteredRanked] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  let index = 0;
  const router = useRouter();
  // Función para filtrar los "rankeds" según la categoría seleccionada
  const filterRankedByCategory = (category) => {
    if (category === "") {
      setFilteredRanked([]); // Si no se seleccionó una categoría, no mostramos ningún "ranked"
    } else {
      // Filtra los "rankeds" en función de la categoría seleccionada
      const filteredData = ranked.filter((dataRanked) =>
        dataRanked.category.includes(category)
      );
      setFilteredRanked(filteredData);
    }
  };

  // Función para manejar el cambio de categoría seleccionada en el <select>
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterRankedByCategory(category); // Filtrar los "rankeds" al cambiar la categoría
  };

  //MODAL
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = (userId) => {
    setModalShow(true);
    getRankedAndCategorieByUser(userId);
    filterRankedByCategory(selectedCategory); // Filtrar los "rankeds" cuando se abre el modal
  };

  const handleHideModal = () => {
    setModalShow(false);
    setCategorie([]);
    setSelectedCategory("");
    setFilteredRanked([]);
    setRanked([]);
  };
  //Obtener RANKED
  const getRankedAndCategorieByUser = async (userId) => {
    const db = getFirestore();
    const rankedRef = query(
      collection(db, "ranked"),
      where("user", "==", `/users/${userId}`)
    );
    try {
      const querySnapShot = await getDocs(rankedRef);
      const rankedData = querySnapShot.docs.map((doc) => ({
        idRanked: doc.id,
        ...doc.data(),
      }));
      setRanked(rankedData);
      // Array para almacenar las categorías únicas
      const uniqueCategorie = [];

      // Iterar sobre los documentos encontrados
      for (const docSnap of querySnapShot.docs) {
        //Obtener el campo categorie del ranked
        const categoryRef = docSnap.data().category;
        //Extraer el id
        const categoryId = categoryRef.split("/").pop();

        //Verificar si la categoria ya se encuentra en la lista
        if (!uniqueCategorie.includes(categoryId)) {
          uniqueCategorie.push(categoryId);
        }
      }

      //Obtener info de categoria
      const categoriesData = [];

      for (const categoryId of uniqueCategorie) {
        const catRef = doc(db, "categories", categoryId);
        const categorieDocSnap = await getDoc(catRef);

        if (categorieDocSnap.exists()) {
          const categoryData = categorieDocSnap.data();
          categoriesData.push({
            id: categoryId, // Agregar el ID de la categoría
            ...categoryData, // Agregar los datos de la categoría
          });
        }
      }
      if (categoriesData.length > 0) {
        setCategorie(categoriesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //OBTENER USUARIOS
  const getUsers = async () => {
    const db = getFirestore();
    const userCollectionRef = collection(db, "users");

    try {
      const querySnapShoot = await getDocs(userCollectionRef);
      const userData = querySnapShoot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      //Obtener datos de localstorage
      const dataLSUser = localStorage.getItem("userData");
      const parseuserData = JSON.parse(dataLSUser);

      const filterData = userData.filter((usr) => usr.id !== parseuserData.id);
      setUsers(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  //ACTUALIZAR USUARIO
  const updateUser = (id) => {
    router.push({
      pathname: "/updateUser/[id]",
      query: { id },
    });
  };

  const deleteUser = async (userId, email) => {
    try {
      //Eliminar de la colección
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);

      //Eliminar de autenticacion el email
      const usr = auth.currentUser;

      if (usr && usr.email === email) {
        await deleteUserAuth(usr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = (userId, email) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás volver atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6667AB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(userId, email);
        getUsers();
        Swal.fire("Eliminado!", "Usuario eliminado correctamente.", "success");
      }
    });
  };

  useEffect(() => {
    const dataStorage = localStorage.getItem("userData");
    const parseUserData = JSON.parse(dataStorage);
    setUsr(parseUserData);
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout title={`Bienvenido ${usr?.name} ${usr?.last_name}`}>
      <div className={styleUsers.text_box}>
        <h1 className={styleUsers.h1}>USUARIOS</h1>
      </div>
      <div className={styleUsers.newAccount}>
        <Link href="newAccount" className={styleUsers.newAccountBtn}>
          <FaIcons.FaPlus className={styleUsers.i} />
          CREAR USUARIO
        </Link>
      </div>
      <ul>
        <div className={styleUsers.table}>
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: "#6667AB", color: "#fff" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombres</th>
                <th scope="col">Correo</th>
                <th scope="col">Nombre de usuario</th>
                <th
                  scope="col"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Opciones
                </th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody key={user.id}>
                <tr>
                  <th scope="row">{(index += 1)}</th>
                  <td>
                    {user.name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.user_name}</td>
                  <td>
                    <div className={styleUsers.btns}>
                      <button
                        className={`btn btn-success ${styleUsers.btn}`}
                        onClick={() => updateUser(user.id)}
                      >
                        <FaIcons.FaPen />
                      </button>
                      <button
                        className={`btn btn-danger ${styleUsers.btn}`}
                        onClick={() => handleDeleteUser(user.id, user.email)}
                      >
                        <FaIcons.FaTrashAlt />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleShowModal(user.id)}
                      >
                        <FaIcons.FaChartBar />
                      </button>
                      <Modal
                        show={modalShow}
                        onHide={handleHideModal}
                        titleHead={`Puntaje`}
                      >
                        <select
                          className="form-select"
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                        >
                          <option value="" disabled>
                            Seleccione una opción...
                          </option>
                          {categorie.length > 0 ? (
                            categorie.map((dataCategory) => (
                              <option
                                key={dataCategory.id}
                                value={dataCategory.id}
                              >
                                {dataCategory.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>
                              No hay categorías disponibles
                            </option>
                          )}
                        </select>
                        <div
                          style={{
                            paddingTop: "20px",
                            maxHeight: "500px",
                            overflowY: "auto",
                          }}
                        >
                          {selectedCategory ? (
                            filteredRanked === "" ? (
                              <p>Seleccione una opción</p>
                            ) : filteredRanked.length > 0 &&
                              filteredRanked.some(
                                (dataAnswer) => dataAnswer.correct_answer >= 5
                              ) ? (
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tiempo</th>
                                    <th scope="col">Respuestas Correctas</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredRanked
                                    .filter(
                                      (dataAnswer) =>
                                        dataAnswer.correct_answer >= 5
                                    )
                                    .slice() // Copiamos la matriz para no modificar la original
                                    .sort((a, b) => a.answer - b.answer)
                                    .map((dataRanked, index) => {
                                      // Convierte el timestamp a un objeto Date
                                      const timestamp =
                                        dataRanked.time.toDate();

                                      // Formatea la fecha y hora como una cadena legible
                                      const formattedDateTime =
                                        timestamp.toLocaleString();

                                      const correctAnswers =
                                        dataRanked.correct_answer;

                                      // Establece un estilo CSS condicional para la barra de porcentaje
                                      const percentageCellStyle = {
                                        backgroundColor:
                                          correctAnswers >= 7 ? "green" : "red",
                                        width: "100%",
                                        height: "20px",
                                        fontWeight: "bold",
                                        display: "flex",
                                        justifyContent: "center",
                                      };

                                      return (
                                        <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{formattedDateTime}</td>
                                          <td>
                                            <div style={percentageCellStyle}>
                                              {correctAnswers} de 10
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            ) : (
                              <p>
                                No hay datos donde el puntaje sea mayor a 5.
                              </p>
                            )
                          ) : null}
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </ul>
    </Layout>
  );
};
User.Auth = WithPrivateRoute;
export default User;

import Layout from "@/components/Layout";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { deleteUser as deleteUserAuth } from "firebase/auth";

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
  let index = 0;
  const router = useRouter();

  const getUsers = async () => {
    const db = getFirestore();
    const userCollectionRef = collection(db, "users");

    try {
      const querySnapShoot = await getDocs(userCollectionRef);
      const userData = querySnapShoot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filterData = userData.filter((usr) => usr.id !== user?.id);
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
          <table className="table table-striped table-bordered" >
            <thead style={{backgroundColor:"#6667AB",color:"#fff"}}>
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

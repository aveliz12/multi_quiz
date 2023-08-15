import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import styleUsers from "../../styles/users.module.scss";
const User = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  let index = 0;
  const router = useRouter();

  //UID
  const {
    query: { userUid },
  } = router;

  const getUserData = async () => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", userUid);
      const userSnapShot = await getDoc(userDocRef);

      if (userSnapShot.exists()) {
        const data = userSnapShot.data();
        setUser(data);
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error obteniendo los datos del usuario:", error);
    }
  };

  const getUsers = async () => {
    const db = getFirestore();
    const userCollectionRef = collection(db, "users");

    try {
      const querySnapShoot = await getDocs(userCollectionRef);
      const userData = querySnapShoot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
      getUserData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userUid) {
      getUsers();
    }
  }, [userUid]);

  return (
    <>
      <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
        <h1>USUARIOS</h1>
        <ul>
          <div className={styleUsers.table}>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Nombre de usuario</th>
                  <th
                    scope="col"
                    style={{ display: "flex", justifyContent: "center" }}
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
                        <button className="btn btn-success">EDITAR</button>
                        <button className="btn btn-danger">ELIMINAR</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </ul>
      </Layout>
    </>
  );
};

export default User;

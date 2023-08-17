import Layout from "@/components/Layout";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import styleUsers from "../styles/users.module.scss";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
const User = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  let index = 0;

  useEffect(() => {
    const storeUserData = localStorage.getItem("userData");
    const userData = storeUserData ? JSON.parse(storeUserData) : null;

    setUser(userData);

    if (userData) {
      const getUsers = async () => {
        const db = getFirestore();
        const userCollectionRef = collection(db, "users");

        try {
          const querySnapShoot = await getDocs(userCollectionRef);
          const userData = querySnapShoot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filterUsers = userData.filter((usr) => usr.id !== user.id);

          setUsers(filterUsers);
        } catch (err) {
          console.log(err);
        }
      };
      getUsers();
    }
  }, [user]);

  return (
    <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
      <div className={styleUsers.text_box}>
        <h1 className={styleUsers.h1}>USUARIOS</h1>
      </div>
      <div className={styleUsers.newAccount}>
        <Link href="" className={styleUsers.newAccountBtn}>
          <FaIcons.FaPlus className={styleUsers.i} />
          CREAR USUARIO
        </Link>
      </div>
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
                      <button className={`btn btn-success ${styleUsers.btn}`}>
                        <FaIcons.FaPen />
                      </button>
                      <button className={`btn btn-danger ${styleUsers.btn}`}>
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

export default User;

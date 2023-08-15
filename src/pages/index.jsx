import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import usersStyle from "../styles/users.module.scss";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";

export default function Home() {
  const [users, setUsers] = useState([]);

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Layout title="Desde Usuarios">
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

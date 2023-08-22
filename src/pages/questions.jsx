import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
const Questions = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storeUserData = localStorage.getItem("userData");
    const userData = storeUserData ? JSON.parse(storeUserData) : null;

    setUser(userData);
  }, []);

  return (
    <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
      <h1>PREGUNTAS</h1>
    </Layout>
  );
};

export default Questions;

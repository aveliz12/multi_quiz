import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userStoreData = localStorage.getItem("userData");
    const userData = userStoreData ? JSON.parse(userStoreData) : null;

    setUser(userData);
  }, []);

  return (
    <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
      <h1>CATEGORIAS</h1>
    </Layout>
  );
};

export default Categories;

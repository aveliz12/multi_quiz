import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";

const Questions = () => {
  // const [user, setUser] = useState([]);
  const { user } = useUser();

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <h1>PREGUNTAS</h1>
    </Layout>
  );
};

Questions.Auth = WithPrivateRoute;
export default Questions;

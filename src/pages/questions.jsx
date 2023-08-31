import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";
import { useRouter } from "next/router";

const Questions = () => {
  // const [user, setUser] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const { query:id } = router;
  console.log(id);

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <h1>PREGUNTAS</h1>
    </Layout>
  );
};

Questions.Auth = WithPrivateRoute;
export default Questions;

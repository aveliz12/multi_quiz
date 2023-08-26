import React from "react";
import Layout from "@/components/Layout";
import WithPrivateRoute from "../components/WithPrivateRoute";
import { useUser } from "../components/UserContext";

const Profile = () => {
  const { user } = useUser();

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <h2>Pefil</h2>
    </Layout>
  );
};
Profile.Auth = WithPrivateRoute;

export default Profile;

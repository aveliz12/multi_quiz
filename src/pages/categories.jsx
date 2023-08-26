import Layout from "@/components/Layout";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Image from "next/image";
import WithPrivateRoute from "../components/WithPrivateRoute";
import styleCategories from "../styles/categories.module.scss";
import * as FaIcons from "react-icons/fa";

const Categories = () => {
  const [user, setUser] = useState([]);
  const [categorie, setCategorie] = useState([]);

  const getCategories = async () => {
    const db = getFirestore();
    const categorieCollectionRef = collection(db, "categories");

    try {
      const querySnapShoot = await getDocs(categorieCollectionRef);
      const categorieData = querySnapShoot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorie(categorieData);
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener imagen
  const getImage = async (pathImage) => {
    const storage = getStorage();
    const imageRef = ref(storage, pathImage);

    try {
      const imageData = await getDownloadURL(imageRef);
      return imageData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userStoreData = localStorage.getItem("userData");
    const userData = userStoreData ? JSON.parse(userStoreData) : null;

    setUser(userData);

    getCategories();
  }, []);

  return (
    <Layout title={`Bienvenido ${user.name} ${user.last_name}`}>
      <div className={styleCategories.cardGrid}>
        {categorie.map((category) => (
          <div className="container" key={category.id}>
            <div className={styleCategories.card}>
              <div className={styleCategories.card_landing}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={250}
                  decoding="async"
                  className={styleCategories.img}
                />
                <div className={styleCategories.header}>
                  <h6 className={styleCategories.title}>{category.name}</h6>
                  <button className={styleCategories.btn}>
                    <FaIcons.FaTrashAlt />
                  </button>
                </div>
              </div>
              <div className={styleCategories.card_info}>
                <div className={styleCategories.head}>
                  <div className={styleCategories.content}>
                    <p className={styleCategories.description}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eos voluptatum dicta, magni sapiente nemo porro a vero.
                    </p>
                  </div>
                  <button className={styleCategories.btnEdit}>EDITAR</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Categories.Auth = WithPrivateRoute;

export default Categories;

import Layout from "@/components/Layout";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Image from "next/image";
import WithPrivateRoute from "../components/WithPrivateRoute";
import styleCategories from "../styles/categories.module.scss";
import * as FaIcons from "react-icons/fa";
import { useUser } from "../components/UserContext";
import Swal from "sweetalert2";
import Link from "next/link";

const Categories = () => {
  const { user } = useUser();

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

  //Eliminar categoria
  const deleteCategorie = async (idCat) => {
    try {
      const db = getFirestore();
      const catRef = doc(db, "categories", idCat);
      await deleteDoc(userRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (idCat) => {
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
        await deleteCategorie(idCat);
        getCategories();
        Swal.fire(
          "Eliminado!",
          "Categoría eliminada correctamente.",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout title={`Bienvenido ${user?.name} ${user?.last_name}`}>
      <div className={styleCategories.headContainer}>
        <h5
          style={{
            fontSize: "40px",
          }}
        >
          Categorias
        </h5>
        <Link href="" className={styleCategories.btnAdd}>
          <FaIcons.FaPlus style={{ marginRight: "8px", marginLeft: "8px" }} />
          CREAR CATEGORIA
        </Link>
      </div>
      <div className={styleCategories.cardGrid}>
        {categorie.map((category) => (
          <div className="container" key={category.id}>
            <div className={styleCategories.card}>
              <div className={styleCategories.card_landing}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={200}
                  decoding="async"
                  className={styleCategories.img}
                />
                <div className={styleCategories.header}>
                  <h6 className={styleCategories.title}>{category.name}</h6>
                  <button
                    className={styleCategories.btn}
                    onClick={() => handleDelete(category.id)}
                  >
                    <FaIcons.FaTrashAlt />
                  </button>
                </div>
              </div>
              <div className={styleCategories.card_info}>
                <div className={styleCategories.head}>
                  <div className={styleCategories.content}>
                    <p className={styleCategories.description}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className={styleCategories.btnEditDetail}>
                    <button className={styleCategories.btnEdit}><FaIcons.FaEdit /></button>
                    <button className={styleCategories.btnDetail}>
                    <FaIcons.FaQuestion />
                    </button>
                  </div>
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

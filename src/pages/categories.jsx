import Layout from "@/components/Layout";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Image from "next/image";
import WithPrivateRoute from "../components/WithPrivateRoute";
import styleCategories from "../styles/categories.module.scss";
import * as FaIcons from "react-icons/fa";
import { useUser } from "../components/UserContext";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
const Categories = () => {
  const { user } = useUser();
  const { updateCategoryId } = useUser();

  const router = useRouter();
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
      await deleteDoc(catRef);
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

  //Questions
  const showQuestions = (id) => {
    updateCategoryId(id);

    router.push({
      pathname: "/questions",
      query: { id },
    });
  };

  //Actualizar Categoría
  const updateCategorie = (id) => {
    router.push({
      pathname: "/updateCategorie/[id]",
      query: { id },
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
            marginLeft: "25px",
          }}
        >
          Categorias
        </h5>
        <Link href="newCategorie" className={styleCategories.btnAdd}>
          <FaIcons.FaPlus style={{ marginRight: "8px", marginLeft: "8px" }} />
          CREAR CATEGORIA
        </Link>
      </div>
      <div className={styleCategories.cardGrid}>
        {categorie.map((category) => (
          <div className="container" key={category.id}>
            <div className={styleCategories.card}>
              <div className={styleCategories.card_landing}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={
                      !category.image
                        ? "/images/category_default.png"
                        : category.image
                    }
                    alt={category.name}
                    width={150}
                    height={200}
                    decoding="async"
                    className={styleCategories.img}
                  />
                </div>
                <div className={styleCategories.header}>
                  <div className="col">
                    <h6 className={styleCategories.title}>{category.name}</h6>
                  </div>
                  <div
                    className="col"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button
                      className={styleCategories.btn}
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaIcons.FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styleCategories.card_info}>
                <div className={styleCategories.head}>
                  <div className={styleCategories.content}>
                    <p className={styleCategories.description}>
                      {category.description}
                    </p>
                  </div>
                  <div className={styleCategories.btnEditDetail}>
                    <button
                      className={styleCategories.btnEdit}
                      onClick={() => updateCategorie(category.id)}
                    >
                      <FaIcons.FaEdit />
                    </button>
                    <button
                      className={styleCategories.btnDetail}
                      onClick={() => showQuestions(category.id)}
                    >
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

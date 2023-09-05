import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [categoryId, setCategoryId] = useState(null); // Agrega el estado del ID de la categoría.

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedCategoryId = localStorage.getItem("categoryId");
    if (storedCategoryId) {
      setCategoryId(storedCategoryId);
    }
  }, []);
  // Agrega una función para actualizar categoryId en el contexto
  const updateCategoryId = (newCategoryId) => {
    setCategoryId(newCategoryId);
    // Guarda el nuevo categoryId en localStorage
    localStorage.setItem("categoryId", newCategoryId);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, categoryId, updateCategoryId }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

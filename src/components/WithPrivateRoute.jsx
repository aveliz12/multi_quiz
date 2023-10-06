import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
const WithPrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
};

export default WithPrivateRoute;

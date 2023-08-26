import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const WithPrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
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

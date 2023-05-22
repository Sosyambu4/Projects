import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "./context/AuthContext";
import { database } from "../../utils/firebase/firebase.config";
import { ThreeDots } from "react-loader-spinner";
import { Loader } from "../Loader/Loader";

const RequireAuth = () => {
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const docRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === "admin") {
          setIsAdmin(true);
        }
      }
      setIsLoading(false);
    };

    checkUserRole();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      navigate("/panelAdmina");
    }
  }, [isAdmin, navigate]);

  if (isLoading) {
    return (
      <Loader>
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" wrapperStyle={{}} visible={true} />
      </Loader>
    );
  } else {
    return user ? <Outlet /> : <Navigate to={"/signin"} />;
  }
};

export default RequireAuth;

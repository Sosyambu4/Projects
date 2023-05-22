import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../RequireAuth/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";
import { Loader } from "../Loader/Loader";
import { ThreeDots } from "react-loader-spinner";
interface ProtectedRouteProps {
  requiredRole?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole = "admin", children }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        navigate("/signin");
        setIsChecking(false);
        return;
      }

      const docRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role !== requiredRole) {
          if (userData.role === "user") {
            navigate("/dashboard");
          } else {
            navigate("/signin");
          }
        }
      } else {
        navigate("/signin");
      }
      setIsChecking(false);
    };

    checkUserRole();
  }, [user, navigate, requiredRole]);

  if (isChecking) {
    return (
      <Loader>
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" wrapperStyle={{}} visible={true} />
      </Loader>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

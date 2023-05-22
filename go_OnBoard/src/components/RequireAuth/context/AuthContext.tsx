import { ReactNode, useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../utils/firebase/firebase.config";
import { ThreeDots } from "react-loader-spinner";
import { Loader } from "../../Loader/Loader";

interface IUserContext {
  user: null | User;
}

const UserContext = createContext<IUserContext>({
  user: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserContext["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <Loader>
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" wrapperStyle={{}} visible={true} />
      </Loader>
    );
  }

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext).user;

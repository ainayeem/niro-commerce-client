import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserInfo = async () => {
    const userInfo = await getCurrentUser();
    setUser(userInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {/*  */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;

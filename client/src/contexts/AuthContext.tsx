import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";

export type UserType = {
  email: string | undefined;
  firstname: string;
  lastname: string | undefined;
  mobile: string | undefined;
  avatar: string | undefined;
  role: "USER" | "ADMIN";
  _id: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  handleLoginUser: (user: UserType) => void;
  handleLogoutUser: () => void;
  getCurrentUser: () => UserType | undefined;
};
const Context = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(Context) as AuthContextType;
}

type AuthContextProp = {
  children: ReactNode;
};

export default function AuthContext({ children }: AuthContextProp) {
  const [localUser] = useLocalStorage<UserType | undefined>("user", undefined);
  const [Auth, setAuth] = useState<{ user: UserType | undefined }>({
    user: localUser,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Auth.user != undefined
  );

  function handleLoginUser(user: UserType) {
    setAuth({ user });
    setIsAuthenticated(false);
  }
  function handleLogoutUser() {
    setAuth({ user: undefined });
    clearLocalStorage();
  }
  function getCurrentUser() {
    return Auth.user;
  }
  const contextValue = {
    isAuthenticated,
    handleLoginUser,
    handleLogoutUser,
    getCurrentUser,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

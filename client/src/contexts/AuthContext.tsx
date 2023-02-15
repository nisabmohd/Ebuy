import { createContext, ReactNode, useContext, useState } from "react";

export type AuthContextType = {
  isAuthenticated: () => boolean;
  handleLoginUser: (user: userType) => void;
  handleLogoutUser: () => void;
  getCurrentUser: () => userType | undefined;
};
const Context = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(Context) as AuthContextType;
}

type AuthContextProp = {
  children: ReactNode;
};

export type userType = {
  email: string | undefined;
  firstname: string;
  lastname: string | undefined;
  mobile: string | undefined;
  avatar: string | undefined;
  role: "USER" | "ADMIN";
};

export default function AuthContext({ children }: AuthContextProp) {
  const [Auth, setAuth] = useState<{ user: userType | undefined }>({
    user: undefined,
  });
  console.log(Auth);

  function isAuthenticated() {
    return Auth != undefined;
  }
  function handleLoginUser(user: userType) {
    console.log(user);
    setAuth({ user });
  }
  function handleLogoutUser() {
    setAuth({ user: undefined });
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

import { createContext, ReactNode, useContext, useState, useMemo } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
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
  _id: string;
};

export default function AuthContext({ children }: AuthContextProp) {
  const [Auth, setAuth] = useState<{ user: userType | undefined }>({
    user: localStorage.getItem("user")
      ? (JSON.parse(localStorage.getItem("user")!) as userType)
      : undefined,
  });

  const isAuthenticated = useMemo(() => Auth.user != undefined, [Auth]);
  function handleLoginUser(user: userType) {
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

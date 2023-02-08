import { createContext, ReactNode, useContext, useState } from "react";

const Context = createContext<any>(undefined);

export function useAuth() {
  return useContext(Context);
}

type AuthContextProp = {
  children: ReactNode;
};

export default function AuthContext({ children }: AuthContextProp) {
  const [Auth, setAuth] = useState<any>();
  function isAuthenticated() {
    return Auth != undefined;
  }
  function handleLogin(user: {}) {
    setAuth(user);
  }
  function handleLogout() {
    setAuth(undefined);
  }
  function getCurrentUser() {
    return Auth.user;
  }
  const contextValue = {
    isAuthenticated,
    handleLogin,
    handleLogout,
    getCurrentUser,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

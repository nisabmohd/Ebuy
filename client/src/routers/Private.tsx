import { ReactNode } from "react";
import Login from "../pages/Login";

type PrivateRouteProps = {
  children: ReactNode;
};
export default function Private({ children }: PrivateRouteProps) {
  const isAuth = true;
  return isAuth ? <>{children}</> : <Login />;
}

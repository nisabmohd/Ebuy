import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};
export default function Private({ children }: PrivateRouteProps) {
  const isAuth = true;
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
}

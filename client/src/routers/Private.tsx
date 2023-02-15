import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};
export default function Private({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
}

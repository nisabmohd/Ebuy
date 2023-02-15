import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import RequestLogin from "../pages/RequestLogin";

type PrivateRouteProps = {
  children: ReactNode;
};
export default function Private({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <RequestLogin page={document.location.pathname} />
  );
}

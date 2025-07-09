import { getItem } from "@helpers";
import type { ProtectedRoute } from "@types";
import { Navigate } from "react-router-dom";

const LoginChildrem = ({ children }:ProtectedRoute) => {
  const isAuth = getItem("access_token");
  const role = getItem("role");
  if (isAuth) {
    return <Navigate to={`/${role}`} replace />;
  }
  return <>{children}</>;
};

export default LoginChildrem;

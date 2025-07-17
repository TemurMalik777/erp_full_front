import { getItem } from "@helpers";
import type { ProtectedRoute } from "@types";
import { Navigate } from "react-router-dom";

const ProtectChildrem = ({ children }: ProtectedRoute) => {
  const isAuth = getItem("access_token");
  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
};

export default ProtectChildrem;

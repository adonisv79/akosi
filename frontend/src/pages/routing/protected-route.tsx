// ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<{
  element: ReactNode;
}> = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem("accessToken") !== null;

  // do not allow login or register on already signed users
  if ( ["/auth", "/auth/register"].includes(location.pathname))
    return isAuthenticated ? <Navigate to="/dash" replace /> : <>{element}</>;

  return !isAuthenticated ? <Navigate to="/" replace /> : <>{element}</> ;
};

export default ProtectedRoute;

// ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserSession from "../../hooks/use-user-session";

const ProtectedRoute: React.FC<{
  element: ReactNode;
}> = ({ element }) => {
  const location = useLocation();
  const session = useUserSession();
  const expiration = new Date(session?.exp * 1000);
  const isExpired = expiration.getTime() < (new Date().getTime());
  const isAuthenticated = !!session && !isExpired;

  // do not allow login or register on already signed users
  if ( ["/auth", "/auth/register"].includes(location.pathname))
    return isAuthenticated ? <Navigate to="/dash" replace /> : <>{element}</>;

  return !isAuthenticated ? <Navigate to="/" replace /> : <>{element}</> ;
};

export default ProtectedRoute;
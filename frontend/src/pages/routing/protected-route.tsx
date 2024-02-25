// ProtectedRoute.tsx
import React, { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserSession from "../../hooks/use-user-session";
import { Logger } from "../../helpers/logger";
import { UserSessionContext } from "../../hooks/user-session.context";
const COMPONENT_NAME = "ProtectedRoute";

const SESSIONLESS_ROUTES = ["/auth", "/auth/register"];

const ProtectedRoute: React.FC<{
  element: ReactNode;
}> = ({ element }) => {
  const logger = new Logger(COMPONENT_NAME);
  const location = useLocation();
  const { token, setToken, killSession } = useUserSession();
  let isAuthenticated = !!token;
  logger.info(`Routing to ${location.pathname}`);
  useEffect(() => {
    if (token) {
      const expiration = new Date(token.exp * 1000);
      const isExpired = expiration.getTime() < new Date().getTime();
      if (isExpired) {
        logger.warn(`[User session is expired!`);
        isAuthenticated = false;
        killSession();
      }
    }
  }, [token]);

  // do not allow login or register on already signed users
  let childElement = <>{element}</>;
  if (SESSIONLESS_ROUTES.includes(location.pathname)) {
    if (isAuthenticated) {
      logger.warn(
        `Authenticated user was accessing a "session-less only" route and was instead redirected to homepage.`
      );
      childElement = <Navigate to="/dash" replace />;
    }
  } else if (!isAuthenticated) {
    logger.warn(
      `Unauthenticated user was accessing a session protected route [${location.pathname}] and was instead redirected to root`
    );
    childElement = <Navigate to="/" replace />;
  }

  return (
    <UserSessionContext.Provider value={{token, setToken, killSession}}>
      {childElement}
    </UserSessionContext.Provider>
  );
};

export default ProtectedRoute;

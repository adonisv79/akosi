import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./homepage";
import { LoginPage } from "./auth/login-page";
import { RegistrationPage } from "./auth/registration-page";

export const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegistrationPage />,
  },
]);

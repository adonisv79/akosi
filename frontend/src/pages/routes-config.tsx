import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./homepage";
import { LoginPage } from "./auth/login-page";
import { RegistrationPage } from "./auth/registration-page";
import { DashboardPage } from "./dashboard/dashboard-page";
import ProtectedRoute from "./routing/protected-route";
import { CreateUserProfile } from "./user/user-profile/create-user-profile";

export const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <ProtectedRoute element={<LoginPage />} />,
  },
  {
    path: "/auth/register",
    element: <ProtectedRoute element={<RegistrationPage />} />,
  },
  {
    path: "/dash",
    element: <ProtectedRoute element={<DashboardPage />} />,
  },
  {
    path: "/profiles/create",
    element: <ProtectedRoute element={<CreateUserProfile />} />,
  },
]);

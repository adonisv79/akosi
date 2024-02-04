import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/login.tsx";
import { i18n } from "./i18n";
import { HomePage } from "./pages/homepage.tsx";
const queryClient = new QueryClient();
const userLanguage = localStorage.getItem('lang') || 'en';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);

i18n.changeLanguage(userLanguage).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  );
});
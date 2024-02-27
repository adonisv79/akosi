import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { i18n } from "./i18n";
import { routeConfig } from "./pages/routes-config";
import { AkosiErrorBoundary } from "./_components/akosi/common/akosi-error-boundary";
const queryClient = new QueryClient();
const userLanguage = localStorage.getItem("lang") || "en";

i18n.changeLanguage(userLanguage).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <AkosiErrorBoundary>
          <RouterProvider router={routeConfig} />
        </AkosiErrorBoundary>
      </React.StrictMode>
    </QueryClientProvider>
  );
});

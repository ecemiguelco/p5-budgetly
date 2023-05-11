import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import MainLayout from "./layout/MainLayout";
import RouteGuard from "./HOC/RouteGuard";
import LoginRedirectGuard from "./HOC/LoginRedirectGuard";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AccountsPage from "./pages/AccountsPage/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LoginRedirectGuard>
          <MainLayout />
        </LoginRedirectGuard>
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: (
            <RouteGuard>
              <DashboardPage />
            </RouteGuard>
          ),
        },
        {
          path: "/accounts",
          element: (
            <RouteGuard>
              <AccountsPage />
            </RouteGuard>
          ),
        },
        {
          path: "/transactions",
          element: (
            <RouteGuard>
              <TransactionsPage />
            </RouteGuard>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <LoginRedirectGuard>
          <LoginPage />
        </LoginRedirectGuard>
      ),
    },
    {
      path: "/registration",
      element: (
        <LoginRedirectGuard>
          <RegisterPage />
        </LoginRedirectGuard>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

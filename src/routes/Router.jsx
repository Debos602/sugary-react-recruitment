import { createBrowserRouter } from "react-router-dom";
import Users from "../pages/Users/Users";
import Products from "../pages/Products/Products";
import NotFound from "../pages/NotFound/NotFound";
import ErrorBoundary from "../pages/ErrorBoundary/ErrorBoundary";
import DashboardLayout from "../pages/Dashboard/Layout/DashboardLayout";
import DashboardOverview from "../pages/Dashboard/DashboarOverview/DashboardOverview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        errorElement: <ErrorBoundary />, // Error boundary for root
        children: [
            { index: true, element: <DashboardOverview /> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
        ],
    },
    {
        path: "*", // Catch-all route for 404
        element: <NotFound />,
    },
]);

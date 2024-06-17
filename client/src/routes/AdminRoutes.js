import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserListComponent } from "../pages/AdminPages/users/UserListComponent";
import { UserCreateComponent } from "../pages/AdminPages/users/UserCreateComponent";
import { VehicleListComponent } from "../pages/AdminPages/vehicles/VehicleListComponent";
import { VehicleCreateComponent } from "../pages/AdminPages/vehicles/VehicleCreateComponent";
import { DragNDrop } from "../pages/AdminPages/tasks/DragNDrop";
import { AdminDashboardComponent } from "../pages/AdminPages/admin/AdminDashboardComponent";
import { ToastContainer, toast } from "react-toastify";
import PageNotFoundComponent from "../components/error/PageNotFoundComponent";
import "react-toastify/dist/ReactToastify.css";
import RouteListComponent from "../pages/AdminPages/routes/RouteListComponent";
import RouteCreateComponent from "../pages/AdminPages/routes/RouteCreateComponent";

export const AdminRoutes = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null || role !== "ADMIN") {
            toast.error("You are not authorized to view this page!");
            navigate("/login");
        }
    }, [token, role]);

    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    };

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route
                    path="/admin/dashboard"
                    element={loadLayout(AdminLayout, AdminDashboardComponent)}
                />
                <Route
                    path="/admin/users"
                    element={loadLayout(AdminLayout, UserListComponent)}
                />
                <Route
                    path="/admin/users/new"
                    element={loadLayout(AdminLayout, UserCreateComponent)}
                />
                <Route
                    path="/admin/vehicles"
                    element={loadLayout(AdminLayout, VehicleListComponent)}
                />
                <Route
                    path="/admin/vehicles/new"
                    element={loadLayout(AdminLayout, VehicleCreateComponent)}
                />
                <Route
                    path="/admin/tasks"
                    element={loadLayout(AdminLayout, DragNDrop)}
                />
                <Route
                    path="/admin/routes"
                    element={loadLayout(AdminLayout, RouteListComponent)}
                />
                <Route
                    path="/admin/routes/new"
                    element={loadLayout(AdminLayout, RouteCreateComponent)}
                />
                <Route path="*" element={<PageNotFoundComponent />} />
            </Routes>
        </>
    );
};

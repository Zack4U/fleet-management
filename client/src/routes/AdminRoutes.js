import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserListComponent } from "../pages/AdminPages/users/UserListComponent";
import { UserCreateComponent } from "../pages/AdminPages/users/UserCreateComponent";
import { VehicleListComponent } from "../pages/AdminPages/vehicles/VehicleListComponent";
import { VehicleCreateComponent } from "../pages/AdminPages/vehicles/VehiclesCreateComponent";
import { DragNDrop } from "../pages/AdminPages/tasks/DragNDrop";

export const AdminRoutes = () => {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    };
    return (
        <Routes>
            <>
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
            </>
        </Routes>
    );
};

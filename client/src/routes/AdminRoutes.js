import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserListComponent } from "../pages/AdminPages/users/UserListComponent";
import { VehicleListComponent } from "../pages/AdminPages/vehicles/VehicleListComponent";

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
                    path="/admin/vehicles"
                    element={loadLayout(AdminLayout, VehicleListComponent)}
                />
            </>
        </Routes>
    );
};

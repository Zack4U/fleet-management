import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DriverLayout } from "../layouts/DriverLayout";
import { MyVehicleListComponent } from "../pages/DriverPages/vehicles/MyVehicleListComponent";
import { MyDragNDrop } from "../pages/DriverPages/tasks/MyDragNDrop";
import { DriverDashboardComponent } from "../pages/DriverPages/driver/DriverDashboardComponent";
import { MyRouteListComponent } from "../pages/DriverPages/routes/MyRouteListComponent";
import { ToastContainer, toast } from "react-toastify";
import PageNotFoundComponent from "../components/error/PageNotFoundComponent";
import "react-toastify/dist/ReactToastify.css";

export const DriverRoutes = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null || role !== "DRIVER") {
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
                    path="/driver/dashboard"
                    element={loadLayout(DriverLayout, DriverDashboardComponent)}
                />
                <Route
                    path="/driver/vehicles"
                    element={loadLayout(DriverLayout, MyVehicleListComponent)}
                />
                <Route
                    path="/driver/tasks"
                    element={loadLayout(DriverLayout, MyDragNDrop)}
                />
                <Route
                    path="/driver/routes"
                    element={loadLayout(DriverLayout, MyRouteListComponent)}
                />
                <Route path="*" element={<PageNotFoundComponent />} />
            </Routes>
        </>
    );
};

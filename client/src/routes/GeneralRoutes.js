import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "../components/login/LoginComponent";
import PageNotFoundComponent from "../components/error/PageNotFoundComponent";

export const GeneralRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/home" element={<LoginComponent />} />
            <Route path="/" element={<LoginComponent />} />
            <Route path="*" element={<LoginComponent />} />
        </Routes>
    );
};

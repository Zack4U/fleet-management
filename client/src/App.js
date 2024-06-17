import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { GeneralRoutes } from "./routes/GeneralRoutes";
import { ThemeProvider } from "./ThemeContext";
import { DriverRoutes } from "./routes/DriverRoutes";
import { useContext, useEffect, useState } from "react";
import UserContext from "./utils/userContext";

function App() {
    const { role } = useContext(UserContext);

    return (
        <ThemeProvider>
            <BrowserRouter>
                {role === "DRIVER" && <DriverRoutes />}
                {role === "ADMIN" && <AdminRoutes />}
                {role === null && <GeneralRoutes />}
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

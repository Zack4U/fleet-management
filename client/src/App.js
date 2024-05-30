import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { GeneralRoutes } from "./routes/GeneralRoutes";
import { ThemeProvider } from "./ThemeContext";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AdminRoutes />
                <GeneralRoutes />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

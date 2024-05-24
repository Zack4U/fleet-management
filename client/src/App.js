import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { ThemeProvider } from "./ThemeContext";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AdminRoutes />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

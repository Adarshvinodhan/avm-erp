import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./layout/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<Dashboard />}>
                    <Route element={<AuthRoutes />}>

                        <Route path="/" element={<h1>Home</h1>} />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
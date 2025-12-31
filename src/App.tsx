import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Coin from "./pages/Coin.tsx";
import Home from "./pages/Home";
import Snake from "./pages/Snake.tsx";
import Wheel from "./pages/Wheel.tsx";
import ForgotPassword from "@/pages/Auth/ForgotPassword.tsx";

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
            <Route
                path="/forgot-password"
                element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />}
            />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin" element={<Coin />} />
                    <Route path="/wheel" element={<Wheel />} />
                    <Route path="/snake" element={<Snake />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
    );
}

import "./App.css";
import {BrowserRouter, Routes} from "react-router-dom";
import React from "react";
import { AuthProvider } from "./components/Auth/AuthContext";

const App:React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
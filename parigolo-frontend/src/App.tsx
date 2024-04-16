import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import { UserProvider } from "./context/useAuth";

const App = () => {
    return (
        <>
            <UserProvider>
                <Outlet />
            </UserProvider>
        </>
    );
}

export default App
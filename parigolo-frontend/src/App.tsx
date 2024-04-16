import { Outlet } from "react-router-dom";
import React from "react";

import "./App.css";
import { UserProvider } from "./context/UseAuth";

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
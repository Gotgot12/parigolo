import { Outlet, useNavigate } from "react-router-dom";
import React from "react";

import "./App.css";
import { UserProvider } from "./context/UseAuth";

const App = () => {

    const user = localStorage.getItem("user");

    const navigate = useNavigate();

    return (
        <UserProvider>
            {user && (
                <button 
                    onClick={() => navigate('/logout')}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            )}
            <Outlet />
        </UserProvider>
    );

}

export default App;
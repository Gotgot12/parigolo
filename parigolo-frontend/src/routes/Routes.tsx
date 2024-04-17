import React from "react"
import { createBrowserRouter } from "react-router-dom"

import App from "../App";
import ProtectedRoute from "./ProtectedRoutes";
import Welcome from "../components/Welcome";
import Auth from "../components/Auth";
import Room from "../components/Room";
import Logout from "../components/Logout";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element:
                <ProtectedRoute>
                    <Welcome />
                </ProtectedRoute>
            },
            { path: "auth", element: <Auth /> },
            { path: "logout", element:
                    <ProtectedRoute>
                        <Logout />
                    </ProtectedRoute>
            },
            {
                path: "rooms/:id",
                element: (
                    <ProtectedRoute>
                        <Room />
                    </ProtectedRoute>
                )
            },
        ],
    },
]);
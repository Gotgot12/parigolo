import React from "react"
import { createBrowserRouter } from "react-router-dom"

import App from "../App";
import ProtectedRoute from "./ProtectedRoutes";
import Welcome from "../components/Welcome/Welcome";
import Auth from "../components/Auth/Auth";
import Room from "../components/Room/Room";

export const router = createBrowserRouter([
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
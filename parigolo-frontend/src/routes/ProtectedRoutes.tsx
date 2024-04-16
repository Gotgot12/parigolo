import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { UseAuth } from "../context/UseAuth";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = UseAuth();
    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
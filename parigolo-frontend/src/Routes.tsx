import React, { useContext } from "react"
import {Routes as Router, Route, Navigate, Outlet} from "react-router-dom"
import { AuthContext } from "./components/Auth/AuthContext"
import Auth from "./components/Auth/Auth"
import Welcome from "./components/Welcome/Welcome"
import Room from "./components/Room/Room";

type Props = {}

const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if(!authenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
}

const Routes = (props: Props) => {
    const { authenticated } = useContext(AuthContext);
    
    return (
        <Router>
            <Route path="/login" element={<Auth />}/>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Welcome />} />
                <Route path="/rooms/:id" element={<Room />} />
            </Route>
        </Router>
    );
}

export default Routes
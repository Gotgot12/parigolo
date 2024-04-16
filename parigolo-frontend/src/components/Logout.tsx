import React from "react";
import {UseAuth} from "../context/UseAuth";

const Logout = () => {

    const { logoutUser } = UseAuth();

    React.useEffect(() => {
        logoutUser();
    }, []);

    return null;
}

export default Logout;
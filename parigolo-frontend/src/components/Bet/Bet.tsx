import React from "react";
import {useLocation} from "react-router-dom";

function Bet() {

    const location = useLocation();

    return (
        <div
            className="flex flex-col items-center">
            <h1
                className="text-5xl font-bold mb-10 mt-10">{location.state?.betName}</h1>
        </div>
    );

}

export default Bet;
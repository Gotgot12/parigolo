import React from "react";
import { useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

interface Bet {
    id: number;
    name: string;
}

function Room() {

    const [betName, setBetName] = useState<string>("");
    const [bets, setBets] = useState<Bet[]>(
        [
            { id: 1, name: "Bet 1"},
            { id: 2, name: "Bet 2"},
            { id: 3, name: "Bet 3"},
        ]
    );

    const location = useLocation();
    const navigate = useNavigate();

    const handleBetCreation = () => {
        const lastBet = bets[bets.length - 1];
        let currentId = 0;
        if (lastBet != null) {
            currentId = lastBet.id;
        }
        const nextId = currentId + 1;
        bets.push({id: nextId, name: betName});
        setBetName("");
    };

    const handleBetDeletion = (id: number) => {
        setBets(bets.filter(bet => bet.id !== id));
    }


    const handleBetClick = (id: number, name: string) => {
        navigate(`/bets/${id}`, {state: {betName: name} });
    };

    return (
        <div
            className="flex flex-col items-center">
            <h1
                className="text-5xl font-bold mb-10 mt-10">{location.state?.roomName}</h1>
            <div className="w-full">
                <div className="flex flex-wrap justify-between ml-4">
                    {bets.map((bet) => (
                        <div key={bet.id}
                             className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-start mb-4 mr-4 cursor-pointer" onClick={() => handleBetClick(bet.id, bet.name)}>
                            <h2 className="text-2xl font-bold mb-4">{bet.name}</h2>
                            <button className="w-full p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                                e.stopPropagation();
                                handleBetDeletion(bet.id);
                            }}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <div
                        className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-start mb-4 mr-4">
                        <h2 className="text-2xl font-bold mb-4">Create a new bet</h2>
                        <div className="w-full">
                            <input
                                type="text"
                                value={betName}
                                onChange={(e) => setBetName(e.target.value)}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-200 rounded-md mb-4"
                            />
                            <button className="w-full p-2 bg-blue-500 text-white rounded-md" onClick={handleBetCreation}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Room;
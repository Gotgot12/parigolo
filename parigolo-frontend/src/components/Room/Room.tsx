import React from "react";
import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface Bet {
    id: number;
    name: string;
    sport: string;
    match: string;
    score: string;
    status: string;
}

function Room() {

    const [createdName, setCreatedName] = useState<string>("");
    const [createdSport, setCreatedSport] = useState<string>("");
    const [createdMatch, setCreatedMatch] = useState<string>("");
    const [addedBet, setAddedBet] = useState<string>("")
    const [addedScore, setAddedScore] = useState<string>("")
    const [bets, setBets] = useState<Bet[]>(
        [
            {id: 1, name: "Bet 1", sport: "Football", match: "PSG VS OM", score: "", status: ""},
            {id: 2, name: "Bet 2", sport: "Basketball", match: "Bulls VS Jazz", score: "", status: ""},
            {id: 3, name: "Bet 3", sport: "Tennis", match: "Alacaraz VS Nadal", score: "", status: ""},
        ]
    );

    const location = useLocation();
    const navigate = useNavigate();

    const handleCreation = () => {
        const lastRoom = bets[bets.length - 1];
        let currentId = 0;
        if (lastRoom != null) {
            currentId = lastRoom.id;
        }
        const nextId = currentId + 1;
        bets.push({id: nextId, name: createdName, sport: createdSport, match: createdMatch, score: "", status: ""});
        setCreatedName("");
        setCreatedSport("");
        setCreatedMatch("");
    };

    const handleAddition = () => {
        setAddedBet("");
        setAddedScore("");
    };

    const handleDeletion = (id: number) => {
        setBets(bets.filter(bet => bet.id !== id));
    }

    const handleBet = (id: number) => {
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">{location.state.name}</h1>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {bets.map((bet) => (
                    <div key={bet.id} className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-2xl font-bold mb-4 text-center">{bet.name}</h2>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Detail : </h3>
                            <ul>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> {bet.sport}</li>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> {bet.match}</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Status : {bet.status}</h3>
                        </div>
                        <button className="w-full mt-4 p-2 bg-green-500 text-white rounded-md" onClick={(e) => {
                            e.stopPropagation();
                            handleBet(bet.id);
                        }}>
                            Bet
                        </button>
                        <button className="w-full mt-4 p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                            e.stopPropagation();
                            handleDeletion(bet.id);
                        }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Create a new bet</h2>
                    <input
                        type="text"
                        value={createdName}
                        onChange={(e) => setCreatedName(e.target.value)}
                        placeholder="Enter the name"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    />
                    <select
                        value={createdSport}
                        onChange={(e) => setCreatedSport(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option value="" disabled>Select the sport</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Tennis">Tennis</option>
                    </select>
                    <input
                        type="text"
                        value={createdMatch}
                        onChange={(e) => setCreatedMatch(e.target.value)}
                        placeholder="Enter the match"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    />
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleCreation}>
                        Confirm
                    </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Add a score to a bet</h2>
                    <select
                        value={addedBet}
                        onChange={(e) => setAddedBet(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option value="" disabled>Select the bet</option>
                        {bets.map((bet) => (
                            <option value={bet.name}>{bet.name}</option>
                        ))};
                    </select>
                    <input
                        type="text"
                        value={addedScore}
                        onChange={(e) => setAddedScore(e.target.value)}
                        placeholder="Enter the score"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    />
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleAddition}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Room;
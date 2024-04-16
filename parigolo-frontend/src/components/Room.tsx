import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

type Bet = {
    id: number;
    name: string;
    sport: string;
    match: string;
    results: string;
    status: string;
}

const Room = () => {

    const [createdName, setCreatedName] = useState<string>("");
    const [createdSport, setCreatedSport] = useState<string>("0");
    const [createdMatch, setCreatedMatch] = useState<string>("");

    const [addedBet, setAddedBet] = useState<string>("0")
    const [addedResults, setAddedResults] = useState<string>("")

    const [predictedBet, setPredictedBet] = useState<string>("0")

    const [predictedResults, setPredictedResults] = useState<string>("")
    const [bets, setBets] = useState<Bet[]>(
        [
            {id: 1, name: "Bet 1", sport: "Football", match: "PSG VS OM", results: "", status: ""},
            {id: 2, name: "Bet 2", sport: "Basketball", match: "Bulls VS Jazz", results: "", status: ""},
            {id: 3, name: "Bet 3", sport: "Tennis", match: "Alacaraz VS Nadal", results: "", status: ""},
        ]
    );

    const rows = [
        {id: 1, pseudo: 'Got', score: 302.2}
    ]

    const location = useLocation();

    const handleCreation = () => {
        const lastRoom = bets[bets.length - 1];
        let currentId = 0;
        if (lastRoom != null) {
            currentId = lastRoom.id;
        }
        const nextId = currentId + 1;
        bets.push({id: nextId, name: createdName, sport: createdSport, match: createdMatch, results: "", status: ""});
        setCreatedName("");
        setCreatedSport("");
        setCreatedMatch("");
    };

    const handleAddition = () => {
        const bet = bets[parseInt(addedBet)-1]
        bet.results = addedResults
        setAddedBet("0");
        setAddedResults("");
    };

    const handleDeletion = (id: number) => {
        setBets(bets.filter(bet => bet.id !== id));
    }

    const handlePrediction = () => {
        console.log(`Prediction | Bet ID = ${predictedBet} & Bet Results = ${predictedResults}`)
        setPredictedBet("0")
        setPredictedResults("")
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">{location.state.name}</h1>
            <div className="grid grid-cols-1 gap-4 mb-10">
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ width: '33.33%' }}>Position</TableCell>
                                    <TableCell align="center" style={{ width: '33.33%' }}>Pseudo</TableCell>
                                    <TableCell align="center" style={{ width: '33.33%' }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, position) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell align="center" component="th" scope="row" style={{ width: '33.33%' }}>
                                            {position}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: '33.33%' }}>{row.pseudo}</TableCell>
                                        <TableCell align="center" style={{ width: '33.33%' }}>{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {bets.map((bet) => (
                    <div key={bet.id} className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-2xl font-bold mb-4 text-center">{bet.name}</h2>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Detail</h3>
                            <ul>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> Sport : {bet.sport}</li>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> Match : {bet.match}</li>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> Results : {bet.results}</li>
                                <li key={bet.id}><span className="mr-2">&#8226;</span> Status : {bet.status}</li>
                            </ul>
                        </div>
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
                        <option value="0" disabled>Select the sport</option>
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
                    <h2 className="text-2xl font-bold mb-4">Add results to a bet</h2>
                    <select
                        value={addedBet}
                        onChange={(e) => setAddedBet(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option value="0" disabled>Select the bet</option>
                        {bets.map((bet) => (
                            <option value={bet.id}>{bet.name}</option>
                        ))};
                    </select>
                    <input
                        type="text"
                        value={addedResults}
                        onChange={(e) => setAddedResults(e.target.value)}
                        placeholder="Enter the results"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    />
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleAddition}>
                        Confirm
                    </button>
                </div>

                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Give a prediction</h2>
                    <select
                        value={predictedBet}
                        onChange={(e) => setPredictedBet(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option value="0" disabled>Select the bet</option>
                        {bets.map((bet) => (
                            <option value={bet.id}>{bet.name}</option>
                        ))};
                    </select>
                    <input
                        type="text"
                        value={predictedResults}
                        onChange={(e) => setPredictedResults(e.target.value)}
                        placeholder="Enter the results"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    />
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handlePrediction}>
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    );

}

export default Room;
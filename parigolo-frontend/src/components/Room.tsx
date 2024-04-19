import React, { useEffect } from "react";
import { useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "../axios/axios";

type Bet = {
    id: number;
    name: string;
    sport: string;
    isClosed: boolean;
    isEnded: boolean;
    RoomId: number;
}

type Room = {
    id: number;
    name: string;
    ownerId: number;
    participants?: Participant[]
}

type Choice = {
    id: number;
    name: string;
    isWin: number;
    BetId: number;
}


type Leaderboard = {
    id: number;
    personPseudo: string;
    score: number;
    PersonId: number;
    RoomId: number;
}

type Participant = {
    id: number;
    pseudo: string;
}

const Room = () => {

    const location = useLocation();

    const [createdName, setCreatedName] = useState<string>("");
    const [createdSport, setCreatedSport] = useState<string>("0");

    const [addedBet, setAddedBet] = useState<string>("0")
    const [addedResults, setAddedResults] = useState<string>("")

    const [predictedBet, setPredictedBet] = useState<string>("0")
    const [predictedResults, setPredictedResults] = useState<string>("")

    const [choices, setChoices] = useState<Choice[]>([]);

    const [bets, setBets] = useState<Bet[]>([]);

    const [person, setPerson] = useState<Participant>();

    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

    let { id } = useParams();

    const navigate = useNavigate();

    const [isAuthorized, setIsAuthorized] = useState(false);

    const [room, setRoom] = useState<Room>();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setPerson(JSON.parse(user))
        }
        axios.get(`/room/${id}`)
            .then((response) => {
                console.log(response);
                setRoom(response.data);
            })
            .catch((error) => console.log(error));

        axios.get(`/bets/${id}`)
            .then((response) => {
                setBets(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error))

        axios.get(`/leaderboards/${id}`)
            .then((response) => {
                console.log(response);
                setLeaderboard(response.data.sort(compareScore));
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (person) {
            axios.get(`/person-room/${person?.id}`)
                .then((response) => {
                    console.log(response.data);
                    let isInTheRoom = false;
                    for (const personRoom of response.data) {
                        if (personRoom.RoomId == parseInt(id!)) {
                            isInTheRoom = true;
                        }
                    }
                    if (!isInTheRoom) {
                        navigate("/")
                    } else {
                        setIsAuthorized(true);
                    }
                })
        }

        axios.get(`/choices/${person?.id}`)
            .then((response) => {
                setChoices(response.data)
                console.log(response)
            })
            .catch((error) => console.log(error))
    }, [person]);

    const handleCreation = () => {
        axios.post(`/bets`, {
            name: createdName,
            sport: createdSport,
            isClosed: false,
            isEnded: false,
            RoomId: id
        })
            .then((response) => {
                setBets((previousBets) => [...previousBets, response.data])
                setCreatedName("");
                setCreatedSport("0");
                console.log(response)
            })
            .catch((error) => console.log(error))

    };

    const handleAddition = () => {
        const currentBet = bets.find((bet) => bet.id === parseInt(addedBet))
        if (currentBet) {
            axios.get(`/choices/bet/${currentBet?.id}`)
                .then((response) => {
                    console.log(response.data)
                    const choices: Choice[] = response.data
                    choices.map((choice) => {
                        axios.get(`/choice-person/choice/${choice.id}`)
                            .then((response) => {
                                console.log(response.data)
                                console.log(leaderboard)
                                const currentPersonLeaderboard = leaderboard.find((leader) => leader.PersonId === response.data.PersonId)
                                console.log(currentPersonLeaderboard)
                                if (choice.name === addedResults) {
                                    choice.isWin = 1
                                    currentPersonLeaderboard!.score += 10;
                                } else {
                                    choice.isWin = 0
                                    currentPersonLeaderboard!.score -= 10;
                                }
                                axios.put(`/choices/${choice.id}`, choice)
                                    .then((response) => console.log(response.data))
                                    .catch((error) => console.log(error))

                                axios.put(`/leaderboards/${currentPersonLeaderboard?.id}`, currentPersonLeaderboard)
                                    .then((response) => {
                                        window.location.reload();
                                        console.log(response)
                                    })
                                    .catch((error) => console.log(error))
                            })
                            .catch((error) => console.log(error))
                    })
                })
                .catch((error) => console.log(error))
            currentBet.isEnded = true
            currentBet.isClosed = true
            axios.put(`/bets/${currentBet.id}`, currentBet)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
            setAddedBet("0");
            setAddedResults("");
        }
    };

    const compareScore = (a: Leaderboard, b: Leaderboard) => {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        return 0;
    };

    const handleDeletion = (id: number) => {
        axios.delete(`/bets/${id}`)
            .then((response) => {
                console.log(response);
                setBets(bets?.filter(bet => bet.id !== id));
            })
            .catch((error) => console.log(error));
    }

    const handlePrediction = () => {
        axios.post(`/choices`, {
            name: predictedResults,
            isWin: false,
            BetId: parseInt(predictedBet)
        })
            .then((response) => {
                console.log(response.data)
                setChoices((previousChoice) => [...previousChoice, response.data])
                axios.post(`choice-person`, {
                    ChoiceId: response.data.id,
                    PersonId: person?.id
                })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => console.log(error))
                setPredictedBet("0")
                setPredictedResults("")
            })
            .catch((error) => console.log(error))
    }

    if (!isAuthorized) {
        return <div></div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">{room?.name}</h1>
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
                                {leaderboard.map((row, position) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell align="center" component="th" scope="row" style={{ width: '33.33%' }}>
                                            {position + 1}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: '33.33%' }}>{row.personPseudo}</TableCell>
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
                                {choices.find((choice) => choice.BetId === bet.id) && (
                                    <li><span className="mr-2">&#8226;</span> Prédiction du joueur : {choices.find((choice) => choice.BetId === bet.id)?.name}</li>
                                )}
                            </ul>
                        </div>
                        {room?.ownerId === person?.id && (
                            <button className="w-full mt-4 p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                                e.stopPropagation();
                                handleDeletion(bet.id);
                            }}>
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {room?.ownerId === person?.id && (
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
                        <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleCreation}>
                            Confirm
                        </button>
                    </div>
                )}
                {room?.ownerId === person?.id && (
                    <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                        <h2 className="text-2xl font-bold mb-4">Add results to a bet</h2>
                        <select
                            value={addedBet}
                            onChange={(e) => setAddedBet(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                        >
                            <option key={0} value="0" disabled>Select the bet</option>
                            {bets.map((bet) => (
                                <option key={bet.id} value={bet.id}>{bet.name}</option>
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
                )}
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Give a prediction</h2>
                    <select
                        value={predictedBet}
                        onChange={(e) => setPredictedBet(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option key={0} value="0" disabled>Select the bet</option>
                        {bets.map((bet) => (
                            <option key={bet.id} value={bet.id}>{bet.name}</option>
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
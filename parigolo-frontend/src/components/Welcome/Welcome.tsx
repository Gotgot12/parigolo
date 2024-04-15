import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
    id: number;
    name: string;
    bets: Bet[]
    participants: Participant[]
}

interface Bet {
    id: number;
    name: string;
}

interface Participant {
    id: number;
    name: string;
}

function Welcome() {

    const [createdName, setCreatedName] = useState<string>("");
    const [addedRoom, setAddedRoom] = useState<string>("");
    const [addedParticipant, setAddedParticipant] = useState<string>("");
    const [bets, setBets] = useState<Bet[]>(
        [{id: 1, name: "Bet 1"},
            {id: 2, name: "Bet 2"},
            {id: 3, name: "Bet 3"}
        ]
    );
    const [participants, setParticipants] = useState<Participant[]>(
        [{id: 1, name: "Participant 1"},
            {id: 2, name: "Participant 2"},
            {id: 3, name: "Participant 3"}
        ]
    );
    const [rooms, setRooms] = useState<Room[]>(
        [
            { id: 1, name: "Room 1", bets: bets, participants: participants},
            { id: 2, name: "Room 2", bets: bets, participants: participants},
            { id: 3, name: "Room 3", bets: bets, participants: participants}
        ]
    );

    const navigate = useNavigate();

    const handleCreation = () => {
        const lastRoom = rooms[rooms.length - 1];
        let currentId = 0;
        if (lastRoom != null) {
            currentId = lastRoom.id;
        }
        const nextId = currentId + 1;
        rooms.push({id: nextId, name: createdName, bets: bets, participants: participants});
        setCreatedName("");
    };

    const handleAddition = () => {
        setAddedRoom("");
        setAddedParticipant("");
    }

    const handleDeletion = (id: number) => {
        setRooms(rooms.filter(room => room.id !== id));
    }

    const handleClick = (id: number, name: string) => {
        navigate(`/rooms/${id}`, {state: {name: name} });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">Welcome</h1>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-gray-100 p-4 rounded-md cursor-pointer"
                         onClick={() => handleClick(room.id, room.name)}>
                        <h2 className="text-2xl font-bold mb-4 text-center">{room.name}</h2>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Bets :</h3>
                            <ul>
                                {room.bets.map((bet) => (
                                    <li key={bet.id}><span className="mr-2">&#8226;</span> {bet.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Participants :</h3>
                            <ul>
                                {room.participants.map((participant) => (
                                    <li key={participant.id}><span className="mr-2">&#8226;</span> {participant.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full mt-4 p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                            e.stopPropagation();
                            handleDeletion(room.id);
                        }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Create a new room</h2>
                    <input
                        type="text"
                        value={createdName}
                        onChange={(e) => setCreatedName(e.target.value)}
                        placeholder="Enter the name"
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    />
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleCreation}>
                        Confirm
                    </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                    <h2 className="text-2xl font-bold mb-4">Add a participant to a room</h2>
                    <select
                        value={addedRoom}
                        onChange={(e) => setAddedRoom(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                    >
                        <option value="" disabled>Select the room</option>
                        {rooms.map((room) => (
                            <option value={room.name}>{room.name}</option>
                        ))};
                    </select>
                    <select
                        value={addedParticipant}
                        onChange={(e) => setAddedParticipant(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                    >
                        <option value="" disabled>Select the participant</option>
                        {participants.map((participant) => (
                            <option value={participant.name}>{participant.name}</option>
                        ))};
                    </select>
                    <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleAddition}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Welcome;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Room = {
    id: number;
    name: string;
    participants: Participant[]
}

type Participant = {
    id: number;
    name: string;
}

const Welcome = () => {

    const [createdName, setCreatedName] = useState<string>("");
    const [addedRoom, setAddedRoom] = useState<string>("0");
    const [addedParticipant, setAddedParticipant] = useState<string>("");
    const [participants] = useState<Participant[]>(
        [{id: 1, name: "Participant 1"},
            {id: 2, name: "Participant 2"},
            {id: 3, name: "Participant 3"}
        ]
    );
    const [rooms, setRooms] = useState<Room[]>(
        [
            { id: 1, name: "Room 1", participants: []},
            { id: 2, name: "Room 2", participants: []},
            { id: 3, name: "Room 3", participants: []}
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
        rooms.push({id: nextId, name: createdName, participants: []});
        setCreatedName("0");
    };

    const handleAddition = () => {
        const room = rooms[parseInt(addedRoom)-1]
        const tempParticipants = room.participants;
        const lastParticipant = tempParticipants[tempParticipants.length - 1];
        let currentId = 0;
        if (lastParticipant != null) {
            currentId = lastParticipant.id;
        }
        tempParticipants.push({id: currentId, name: addedParticipant})
        setAddedRoom("0");
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
                        <option value="0" disabled>Select the room</option>
                        {rooms.map((room) => (
                            <option value={room.id}>{room.name}</option>
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

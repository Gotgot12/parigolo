import axios from "../../axios/axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
    id: number;
    name: string;
}

interface Participant {
    id: number;
    pseudo: string;
    nbPoints: number;
}

interface ParticipantRoom {
    PersonId: number;
    RoomId: number;
}

function Welcome() {

    const [createdName, setCreatedName] = useState<string>("");
    const [addedRoom, setAddedRoom] = useState<number>();
    const [addedParticipant, setAddedParticipant] = useState<number>();
    const [participants, setParticipants] = useState<Participant[]>([]);

    const [participantRoom, setParticipantRoom] = useState<ParticipantRoom[]>([]);

    const [rooms, setRooms] = useState<Room[]>([]);

    const navigate = useNavigate();

    useEffect(() => {    
        axios.get("/persons")
            .then((response) => {
                setParticipants(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error))

        axios.get("/rooms")
            .then((response) => {
                setRooms(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error))
        
        axios.get("/person-room/1")
            .then((response) => {
                setParticipantRoom(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log(error))
    }, [setParticipants, setRooms, setParticipantRoom])

    const handleCreation = () => {
        axios.post('/rooms', {name: createdName})
            .then((response) => {
                console.log(response)
                setCreatedName("")
            })
            .catch((error) => console.log(error))
    };

    const handleAddition = () => {
        axios.post('/person-room', {PersonId: addedParticipant, RoomId: addedRoom})
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        setAddedRoom(0)
        setAddedParticipant(0);
    }

    const handleDeletion = (id: number) => {
        setRooms(rooms?.filter(room => room.id !== id));
    }

    const handleClick = (id: number, name: string) => {
        navigate(`/rooms/${id}`, {state: {name: name} });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">Welcome</h1>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {rooms?.map((room) => (
                    <div key={room.id} className="bg-gray-100 p-4 rounded-md cursor-pointer"
                         onClick={() => handleClick(room.id, room.name)}>
                        <h2 className="text-2xl font-bold mb-4 text-center">{room.name}</h2>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Participants :</h3>
                            <ul>
                                {participantRoom.map((participantRoom) => (
                                    <li key={participantRoom.PersonId}><span className="mr-2">&#8226;</span> {participants.find((participant) => participant.id === participantRoom.PersonId)?.pseudo}</li>
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
                        onChange={(e) => setAddedRoom(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4 mb-4"
                        defaultValue={0}
                    >
                        <option value={0} disabled>Select the room</option>
                        {rooms?.map((room) => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))};
                    </select>
                    <select
                        value={addedParticipant}
                        onChange={(e) => {setAddedParticipant(parseInt(e.target.value))}}
                        className="w-full p-2 border border-gray-200 rounded-md mr-4"
                        defaultValue={0}
                    >
                        <option value={0} disabled>Select the participant</option>
                        {participants?.map((participant) => (
                            <option key={participant.id} value={participant.id}>{participant.pseudo}</option>
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

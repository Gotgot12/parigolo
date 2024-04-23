import axios from "../axios/axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Room = {
    id: number;
    name: string;
    ownerId: number | undefined;
    participants?: Participant[]
}

type Participant = {
    id: number;
    pseudo: string;
}

type ParticipantRoom = {
    PersonId: number;
    RoomId: number;
}

const Welcome = () => {

    const [createdName, setCreatedName] = useState<string>("");
    const [addedRoom, setAddedRoom] = useState<number>();
    const [addedParticipant, setAddedParticipant] = useState<number>();
    const [participants, setParticipants] = useState<Participant[]>([]);

    const [participantRoom, setParticipantRoom] = useState<ParticipantRoom[]>([]);

    const [rooms, setRooms] = useState<Room[]>([]);

    const [person, setPerson] = useState<Participant>();

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setPerson(JSON.parse(user));
        }

        axios.get(`/person-room`)
            .then((response) => {
                console.log(response.data)
                setParticipantRoom(response.data)
            })
            .catch((error) => console.log(error));

        axios.get("/persons")
            .then((response) => {
                setParticipants(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (person) {
            console.log(person?.id)
            axios.get(`/rooms/${person?.id}`)
                .then((response) => {
                    setRooms(response.data);
                    console.log(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [person])

    const handleCreation = () => {
        axios.post("/rooms", { name: createdName, ownerId: person?.id })
            .then((response) => {
                console.log(response);
                axios.post("/person-room", { PersonId: person?.id, RoomId: response.data.id })
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error))
                axios.post("/leaderboards", { PersonId: person?.id, RoomId: response.data.id, score: 0 })
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error))
                setCreatedName("");
                setParticipantRoom((prevParticipantRoom: ParticipantRoom[]) => [...prevParticipantRoom, { PersonId: person?.id, RoomId: response.data.id } as ParticipantRoom]);
                setRooms((prevRooms: Room[]) => [...prevRooms, {
                    ...response.data, participants: [{
                        id: person?.id,
                        pseudo: person?.pseudo,
                    } as Participant], ownerId: person?.id
                } as Room]);
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    const handleAddition = () => {
        axios.post("/person-room", { PersonId: addedParticipant, RoomId: addedRoom })
            .then((response) => {
                console.log(response);
                setParticipantRoom((prevParticipantRoom: ParticipantRoom[]) => [...prevParticipantRoom, { PersonId: addedParticipant, RoomId: addedRoom } as ParticipantRoom]);
                setRooms((prevRooms: Room[]) => prevRooms.map(room => {
                    if (room.id === addedRoom) {
                        const participant = participants?.find(participant => participant.id === addedParticipant);
                        return { ...room, participants: [...(room.participants || []), ...(participant ? [participant] : [])] };
                    }
                    return room;
                }));
                setAddedRoom(0);
                setAddedParticipant(0);
            })
            .catch((error) => console.log(error));
        axios.post("/leaderboards", { PersonId: addedParticipant, RoomId: addedRoom, score: 0 })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    const handleDeletion = (id: number) => {
        axios.delete(`/rooms/${id}`, { data: { ownerId: person?.id } })
            .then((response) => {
                console.log(response);
                setRooms(rooms?.filter(room => room.id !== id));
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const handleClick = (id: number) => {
        navigate(`/rooms/${id}`);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-10 mt-10 text-center">
                Welcome {person?.pseudo}
            </h1>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {rooms?.map((room) => (
                    <div key={room.id} className="bg-gray-100 p-4 rounded-md cursor-pointer"
                        onClick={() => handleClick(room.id)}>
                        <h2 className="text-2xl font-bold mb-4 text-center">{room.name}</h2>
                        <h3 className="text-xl font-bold mb-2">Owner : {participants.find(participant => participant.id === room.ownerId)?.pseudo}</h3>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Players :</h3>
                            <ul>
                                {participantRoom.filter((partRoom) => partRoom.RoomId === room.id).map((participantRoom) => (
                                    <li key={participantRoom.PersonId}><span className="mr-2">&#8226;</span> {participants.find((participant) => participant.id === participantRoom.PersonId)?.pseudo}</li>
                                ))}
                            </ul>
                        </div>
                        {room.ownerId === person?.id && (
                            <button className="w-full mt-4 p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                                e.stopPropagation();
                                handleDeletion(room.id);
                            }}>
                                Delete
                            </button>
                        )}
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
                        {rooms.filter(room => room.ownerId === person?.id).map((room) => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))};
                    </select>
                    <select
                        value={addedParticipant}
                        onChange={(e) => { setAddedParticipant(parseInt(e.target.value)) }}
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

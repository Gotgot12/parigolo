import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Room {
    id: number;
    name: string;
}

function Welcome() {

    const [roomName, setRoomName] = useState<string>("");
    const [rooms, setRooms] = useState<Room[]>(
        [
            { id: 1, name: "Room 1"},
            { id: 2, name: "Room 2"},
            { id: 3, name: "Room 3"},
        ]
    );

    const navigate = useNavigate();

    const handleRoomCreation = () => {
        const lastRoom = rooms[rooms.length - 1];
        let currentId = 0;
        if (lastRoom != null) {
            currentId = lastRoom.id;
        }
        const nextId = currentId + 1;
        rooms.push({id: nextId, name: roomName});
        setRoomName("");
    };

    const handleRoomDeletion = (id: number) => {
        setRooms(rooms.filter(room => room.id !== id));
    }

    const handleRoomClick = (id: number, name: string) => {
        navigate(`/rooms/${id}`, {state: {roomName: name} });
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-10 mt-10">Welcome</h1>
            <div className="w-full">
                <div className="flex flex-wrap justify-between ml-4">
                    {rooms.map((room) => (
                        <div key={room.id}
                             className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-start mb-4 mr-4 cursor-pointer" onClick={() => handleRoomClick(room.id, room.name)}>
                            <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
                            <button className="w-full p-2 bg-red-500 text-white rounded-md" onClick={(e) => {
                                e.stopPropagation();
                                handleRoomDeletion(room.id);
                            }}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <div
                        className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-start mb-4 mr-4">
                    <h2 className="text-2xl font-bold mb-4">Create a new room</h2>
                        <div className="w-full">
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-200 rounded-md mb-4"
                            />
                            <button className="w-full p-2 bg-blue-500 text-white rounded-md" onClick={handleRoomCreation}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Welcome;

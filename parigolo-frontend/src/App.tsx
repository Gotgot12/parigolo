import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "./axios/axios";

import "./App.css";
import { UserProvider } from "./context/UseAuth";

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

const App = () => {

    const user = localStorage.getItem("user");

    const [rooms, setRooms] = useState<Room[]>([]);
    const [person, setPerson] = useState<Participant>();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const roomsPathRegex = /^\/rooms\/.*/;

    useEffect(() => {
        if (user) {
            setPerson(JSON.parse(user))
        }
    }, [user]);

    useEffect(() => {
        if (person) {
            axios.get(`/rooms/${person?.id}`)
                .then((response) => {
                    setRooms(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [person]);

    const handleRoomClick = (roomId: number) => {
        setDropdownOpen(false);
        navigate(`/rooms/${roomId}`);
        window.location.reload();
    };

    return (
        <UserProvider>
            <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center">
                {roomsPathRegex.test(location.pathname) && (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Rooms
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {rooms.map((room) => (
                                        <a
                                            key={room.id}
                                            onClick={() => handleRoomClick(room.id)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            {room.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div></div>
                {user && (
                    <button
                        onClick={() => navigate('/logout')}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
            <div className="pt-16">
                <Outlet />
            </div>
        </UserProvider>
    );

}

export default App;
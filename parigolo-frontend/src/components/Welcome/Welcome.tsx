import React, { useState } from 'react';

function Welcome() {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState(['Room 1', 'Room 2']);

    const handleRoomCreation = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Room "${roomName}" has been created.`);
        setRoomName('');
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-10 mt-10">parigolo</h1>
            <div className="w-full">
                <div className="flex flex-wrap justify-between ml-4">
                    {rooms.map((room, index) => (
                        <div key={index}
                             className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-start mb-4 mr-4">
                            <h2 className="text-2xl font-bold mb-4">{room}</h2>
                            <p>Details</p>
                        </div>
                    ))}
                    <div
                        className="flex-grow bg-gray-100 p-4 rounded-md flex flex-col justify-between mb-4 mr-4">
                        <h2 className="text-2xl font-bold mb-4">Create a new room</h2>
                        <form onSubmit={handleRoomCreation} className="w-full">
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-200 rounded-md mb-4"
                            />
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

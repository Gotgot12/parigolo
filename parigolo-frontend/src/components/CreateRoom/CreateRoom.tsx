import React, { useState } from 'react';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');

  const handleRoomCreation = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can handle the room creation
    console.log(`Room "${roomName}" has been created.`);
    setRoomName('');
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-5xl font-bold mb-5">PariGolo</h1>
      <h2 className="text-2xl font-bold mb-5">Create a New Betting Room</h2>
      <form onSubmit={handleRoomCreation} className="w-4/5">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full p-2 border border-gray-200 rounded-md mb-4"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
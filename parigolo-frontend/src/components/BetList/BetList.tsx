import React from 'react';
import { useNavigate } from 'react-router-dom';

function BetList() {
  const navigate = useNavigate();
  const bets = [
    { id: 1, name: 'Bet 1', roomId: 1, isClosed: false, isEnded: false },
    { id: 2, name: 'Bet 2', roomId: 1, isClosed: true, isEnded: false },
    { id: 3, name: 'Bet 3', roomId: 2, isClosed: false, isEnded: true },
    // Add more bets as needed
  ];

  const handleBetClick = (id: number) => {
    navigate(`/bet/${id}`);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-5">Bet List Page</h2>
      {bets.map((bet) => (
        <div key={bet.id} className="bg-white border border-gray-200 p-5 m-2 w-4/5 rounded-md shadow-md cursor-pointer" onClick={() => handleBetClick(bet.id)}>
          <h3 className="text-xl font-semibold">{bet.name}</h3>
          <p className="mt-2">Room ID: {bet.roomId}</p>
          <p className="mt-2">Is Closed: {bet.isClosed ? 'Yes' : 'No'}</p>
          <p className="mt-2">Is Ended: {bet.isEnded ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default BetList;
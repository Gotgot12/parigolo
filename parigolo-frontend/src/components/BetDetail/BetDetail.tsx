import React from 'react';
import { useParams } from 'react-router-dom';

function BetDetail() {
  const { id } = useParams();
  const bet = { id: 1, name: 'Bet 1', roomId: 1, isClosed: false, isEnded: false }; // Replace with actual data

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-5">Bet Detail Page</h2>
      <div className="bg-white border border-gray-200 p-5 m-2 w-4/5 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">{bet.name}</h3>
        <p className="mt-2">Room ID: {bet.roomId}</p>
        <p className="mt-2">Is Closed: {bet.isClosed ? 'Yes' : 'No'}</p>
        <p className="mt-2">Is Ended: {bet.isEnded ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default BetDetail;
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Auth';
import Welcome from './components/Welcome/Welcome';
import Room from './components/Room/Room';
import Bet from './components/Bet/Bet';
import Leaderboard from './components/Leaderboard/Leaderboard';
import React from 'react';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/bets/:id" element={<Bet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );

}

export default App;
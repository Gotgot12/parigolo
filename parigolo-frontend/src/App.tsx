import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import BetList from './components/BetList/BetList';
import BetDetail from './components/BetDetail/BetDetail';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bets" element={<BetList />} />
        <Route path="/bet/:id" element={<BetDetail />} />
        <Route path="/welcome" element={<Welcome />} />

      </Routes>
    </Router>
  );
}

export default App;
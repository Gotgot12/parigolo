import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Auth';
import BetList from './components/BetList/BetList';
import BetDetail from './components/BetDetail/BetDetail';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Welcome from './components/Welcome/Welcome';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bets" element={<BetList />} />
        <Route path="/bet/:id" element={<BetDetail />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
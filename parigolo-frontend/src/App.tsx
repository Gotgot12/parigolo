import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Auth';
import BetList from './components/BetList/BetList';
import BetDetail from './components/BetDetail/BetDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/bets" element={<BetList />} />
        <Route path="/bet/:id" element={<BetDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
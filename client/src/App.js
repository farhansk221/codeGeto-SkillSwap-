import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Screen1 from './Screen1';
import Login from './Login';
import Registeration from './Registeration';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Navbar from './Navbar';
import Card from './Card';
import Screen5 from './Screen5';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Screen1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/profile" element={<Screen3 />} />
          <Route path="/swap-requests" element={<Screen4 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

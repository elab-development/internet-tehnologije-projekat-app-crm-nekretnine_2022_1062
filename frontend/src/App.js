import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Komponente/Home';
import Login from './Komponente/Login';
import Register from './Komponente/Register';
import Navbar from './Komponente/Navbar';
import Clients from './Komponente/Clients';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('auth_token'));

  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/clients" element={<Clients />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = async () => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      setToken(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {token ? (
          <>
            {user && user.admin ? (
              <>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/dodajKorisnika">Add User</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/clients">Clients</Link></li>
                <li><Link to="/airquality">Air Quality</Link></li>
              </>
            )}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

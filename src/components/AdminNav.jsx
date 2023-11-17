import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar.css';
import './docnav.css';

const AdminNav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set this state based on actual authentication status

  const handleLogout = () => {
    localStorage.removeItem('admindbtoken');
    
    // Update the login status
    setIsLoggedIn(false);

    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className="title">
        <Link to="/" style={{ textDecoration: "none", fontSize: "12px" }}>
          <div className='tt'><h1>Sunrise</h1><h2>Healthcare</h2></div>
        </Link>
      </div>
      <div className="links">
        <ul>
          <button className="linkc butc" onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;

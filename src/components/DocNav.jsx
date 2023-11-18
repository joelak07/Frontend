import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar.css';
import './docnav.css';

const DocNav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set this state based on actual authentication status

  const handleLogout = () => {
    localStorage.removeItem('doctordbtoken');
    
    // Update the login status
    setIsLoggedIn(false);

    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className="title">
        <Link to="/doctor/dashboard" style={{ textDecoration: "none", fontSize: "12px" }}>
          <div className='tt'><h1>Sunrise</h1><h2>Healthcare</h2></div>
        </Link>
      </div>
      <div className="links">
        <ul>
          <Link to="/doctor/profile" className="linkc">My Profile</Link>
          <Link to="/doctor/appointments" className="linkc">My Appointments</Link>
          <button className="linkc butc" onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default DocNav;

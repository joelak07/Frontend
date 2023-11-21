import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar.css';
import './docnav.css';
import logo from '../Assets/logoDoc.png';

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
    <div className='docnavbar'>
    <div className="titledoc" style={{height:"103px"}}>
        <div className='tt'><img src={logo} alt="Logo" style={{ width: '55px', height: '55px', marginTop:'20px', marginRight: '15px' }} /><h1>Sunrise</h1><h2 className='h2Center'>Healthcare</h2></div>
    </div>
      <div className="links">
        <ul>
          <button className="linkd butc" onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;

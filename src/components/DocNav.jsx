import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar.css';
import './docnav.css';
import logo from '../Assets/logoDoc.png';

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
    <div className='docnavbar'>
      <div className="titledoc" style={{height:"103px"}}>
        <Link to="/doctor/dashboard" style={{ textDecoration: "none", fontSize: "12px" }}>
          <div className='tt'><img src={logo} alt="Logo" style={{ width: '55px', height: '55px', marginTop:'20px', marginRight: '15px' }} /><h1>Sunrise</h1><h2 className='h2Center'>Healthcare</h2></div>
        </Link>
      </div>
      <div className="links">
        <ul>
          <Link to="/doctor/profile" className="linkdc">My Profile</Link>
          <Link to="/doctor/appointments" className="linkdc">My Appointments</Link>
          <button className=" butc" onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
};

export default DocNav;

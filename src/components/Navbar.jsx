import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../components/navbar.css';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const location = useLocation();

  if (location.pathname === '/doctor/dashboard' || location.pathname === '/doctor/profile' || location.pathname === '/admin/dashboard' || location.pathname === '/doctor/appointments') {
    return null;
  }

  return (
    <div className='navbar'>
      <div className="title">
        <Link to="/" style={{ textDecoration: "none", fontSize: "12px", display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '55px', marginRight: '15px' }} />
          <div className='tt'>
            <h1>Sunrise</h1>
            <h2><span className='h2Center'>Healthcare</span></h2>
          </div>
        </Link>
      </div>
      <div className="links">
        <ul>
          <Link to="/status" className="linkc">Status</Link>
          <Link to="/appointment" className="linkc">Appointment</Link>
          <Link to="/test" className="linkc">Lab Test</Link>
          <Link to="/login" className="linkc" id="loginNav">Login</Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

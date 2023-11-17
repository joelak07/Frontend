import React from 'react';
import { Link } from 'react-router-dom';
import '../components/navbar.css';
import "./docnav.css";

const DocNav = () => {
    return (
        <div className='navbar'>
            <div className="title">
                <Link to="/" style={{ textDecoration: "none", fontSize: "12px" }}>
                    <div className='tt'><h1>Sunrise</h1><h2>Healthcare</h2></div>
                </Link>
            </div>
            <div className="links">
                <ul>
                    <Link to="/doctordashboard" className="linkc">Doctor</Link>
                    <Link to="/doctorprofile" className="linkc">My Profile</Link>
                    <Link to="/appointment" className="linkc">My Appointments</Link>
                    <button className="linkc butc" >Logout</button>
                </ul>
            </div>
        </div>
    );
};


export default DocNav;
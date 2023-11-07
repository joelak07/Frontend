import React from 'react'
import {Link} from 'react-router-dom';
import '../components/navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="title">
            <Link to="/" style={{textDecoration:"none",fontSize:"12px"}}><div className='tt'><h1>Sunrise</h1><h2>Healthcare</h2></div></Link>
        </div>
        <div className="links">
            <ul>
                <li>Status</li>
                <li>Appointment</li>
                <li>Test</li>
                <li>Login</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
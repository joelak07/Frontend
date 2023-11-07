import React from 'react'
import {Link} from 'react-router-dom';
import '../components/navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="title">
            <h1>Sunrise</h1><h2>Hospital</h2>
        </div>
        <div className="links">
            <ul>
                <li>Status</li>
                <li>Login</li>
                <li>Appointment</li>
                <li>Test</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
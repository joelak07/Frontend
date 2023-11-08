import React from 'react'
import { useState, useEffect } from 'react';
import './login.css'

function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <div className='container'>
            <div className="box">
                <h2>Employee Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='loginlbl'>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='loginipt'
                        />
                    </div>
                    <br />
                    <div>
                        <label className='loginlbl'>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='loginipt'
                        />
                    </div>
                    <br />
                    <div>
                        <button type="submit" className='loginbtn'>Login</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
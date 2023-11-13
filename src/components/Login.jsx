import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:4000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
      
            const data = await response.json();
            console.log(data);

            if (response.status === 401) {
                console.error('Unauthorized:', data);
                setError('User not found');
                return;
              }
            
              if (response.status === 402) {
                console.error('Unauthorized:', data);
                setError('Invalid password');
                return;
              }  

            if (response.status >= 400 && response.status <= 599) {
                console.error('Server error:', data);
                navigate('/error');
                return;
              }
      
            if (data.message === 'User not found') {
              // Show user not found error
              setError('User not found');
            } else if (data.message === 'Invalid password') {
              // Show invalid password error
              setError('Invalid password');
            } else {
              // Clear any previous error
              setError('');
      
              const { token, role } = data;
      
              // Store the token and role in a secure way (e.g., localStorage, cookies)
              localStorage.setItem('patientdbtoken', token);
      
              // Redirect based on the user's role
              if (role === 'admin') {
                navigate('/admin/dashboard');
              } else if (role === 'doctor') {
                navigate('/doctor/dashboard');
              }
            }
          } catch (error) {
          console.error('An error occurred during login:', error);
          // Redirect to Error.jsx if an unexpected error occurs
          navigate('/error');
        }
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
                    {error && <div style={{ color: 'red' }}>{error}</div>}
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
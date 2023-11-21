import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import usePasswordToggle from './usePasswordToggle';

function Login() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [PasswordInputType,ToggleIcon]=usePasswordToggle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://hospital-appointment-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empId, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 401) {
        console.error('Unauthorized:', data);
        setError('User not found');
      } else if (response.status === 402) {
        console.error('Unauthorized:', data);
        setError('Invalid password');
      } else if (response.status >= 400 && response.status <= 599) {
        console.error('Server error:', data);
        navigate('/error');
      } else if (response.status === 200) {
        // Successful login
        const { token, role } = data;

        // Store the token and role in a secure way (e.g., localStorage, cookies)
        localStorage.setItem('doctordbtoken', token);

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
    <div className="container">
      <div className="box">
        <h2>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="loginlbl">Employee ID:</label>
            <input
              type="number"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
              className="loginipt"
              placeholder='Enter Employee ID'
            />
          </div>
          <br />
          <div>
            <label className="loginlbl">Password:</label>
            <input
              type={PasswordInputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="loginipt"
              placeholder='Enter Password'
            />
            <span className="password-toggle-icon">
              {ToggleIcon}
            </span>
          </div>
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <button type="submit" className="loginbtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

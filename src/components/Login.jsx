import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import usePasswordToggle from './usePasswordToggle';

function Login() {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Move setLoading(true) here to show the spinner immediately

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
        const { token, role } = data;
        localStorage.setItem('doctordbtoken', token);

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'doctor') {
          navigate('/doctor/dashboard');
        }
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      navigate('/error');
    } finally {
      setLoading(false);
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
              placeholder="Enter Employee ID"
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
              placeholder="Enter Password"
            />
            <span className="password-toggle-icon">{ToggleIcon}</span>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <br />
            <button type="submit" className="loginbtn" disabled={loading}>
              {loading ? <div className="spinlog"></div> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

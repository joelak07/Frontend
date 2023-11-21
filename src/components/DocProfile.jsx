import React, { useState, useEffect } from 'react';
import './docprofile.css'
import DocNav from './DocNav';
import usePasswordToggle from './usePasswordToggle';
import { useNavigate } from 'react-router-dom';

const DocProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('doctordbtoken');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.empId) {
        setEmpId(decodedToken.empId);
        fetchDoctorDetails(decodedToken.empId);
      }
    }
    if (!token) {
      navigate("/login");
    }
  }, []);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await fetch(`https://hospital-appointment-backend.onrender.com/doctor/getDoctor?doctorId=${doctorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const doctorData = await response.json();
        if (doctorData && doctorData.length > 0) {
          setDoctorDetails(doctorData[0]);
        }
      } else {
        console.error('Failed to fetch doctor details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('doctordbtoken');

      const response = await fetch('https://hospital-appointment-backend.onrender.com/doctor/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ empId, newPassword: password }),
      });

      if (response.ok) {
        console.log('Password changed successfully');
      } else {
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <div className="docprofcont">
      <DocNav />
      <div className="docprofbase">
        <div className="docprofile">
          <h2>My Profile</h2>
          <div>
            <label>Doctor ID:</label>
            <p>{empId}</p>
          </div>
          <br />
          <div>
            <label>Name:</label>
            <p>{doctorDetails.doctorName}</p>
          </div>
          <br />
          <div>
            <label>Speciality:</label>
            <p>{doctorDetails.specialization}</p>
          </div>
          <br />
          <div>
            <label>Qualification:</label>
            <p>{doctorDetails.qualification}</p>
          </div>
          <br />
          <div>
            <label>Password:</label>
            <div className="password-input">
              <input
                type={PasswordInputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle-iconprof">
                {ToggleIcon}
              </span>
            </div>
          </div>
          <br />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>

    </div>
  );
};


export default DocProfile;


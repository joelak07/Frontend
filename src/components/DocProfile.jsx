import React, { useState, useEffect } from 'react';
import './DocProfile.css'
import DocNav from './DocNav';



const DocProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('doctordbtoken');

    // Decode the token to extract empId (assuming it's in the token payload)
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.empId) {
        setEmpId(decodedToken.empId);
        fetchDoctorDetails(decodedToken.empId);
      }
    }
  }, []);

  // Function to decode the token (You might want to use your decoding mechanism)
  const decodeToken = (token) => {
    // Implement token decoding logic here (if not already implemented)
    // JWT decoding
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:4000/doctor/getDoctor?doctorId=${doctorId}`, {
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

      const response = await fetch('http://localhost:4000/doctor/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // Send the token in the header for authentication
        },
        body: JSON.stringify({ empId, newPassword: password }), // Send the new password and user ID
      });

      if (response.ok) {
        console.log('Password changed successfully');
        // Optionally, you might want to clear the password field or show a success message here
      } else {
        console.error('Failed to change password');
        // Handle error scenarios if password change fails
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle other potential errors during the password change process
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };
  

  return (
    <div className="docprofcont">
      <DocNav />
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
          <label>Email:</label>
          <p>{doctorDetails.email}</p>
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <br />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};


export default DocProfile;


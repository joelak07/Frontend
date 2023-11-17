import React, { useState } from 'react';
import './docprofile.css'
import DocNav from './DocNav';



const DocProfile = () => {
  const [name, setName] = useState('Dr. Joel Abraham Koshy');
  const [email, setEmail] = useState('joelabrahamkoshy@gmail.com');
  const [doctorid, setdoctorid] = useState('513135');
  const [docspec, setdocspec] = useState('Cardiologist');
  const [qualification, setqualification] = useState('MBBS MD Cardiology');
  const [password, setPassword] = useState('');

  const handleChangePassword = () => {
    // Implement logic to change the password
    console.log('Password changed successfully');
  };

  return (
    <div className="docprofcont">
        <DocNav/>
        <div className='docprofile'>
      <h2>My Profile</h2>
      <div>
        <label>Doctor ID:</label>
        <p>{doctorid}</p>
      </div>
      <br />
      <div>
        <label>Name:</label>
        <p>{name}</p>
      </div>
      <br />
      <div>
        <label>Email:</label>
        <p>{email}</p>
      </div>
      <br />
      <div>
        <label>Speciality:</label>
        <p>{docspec}</p>
      </div>
      <br />
      <div>
        <label>Qualification:</label>
        <p>{qualification}</p>
      </div>
      <br />
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
    </div>
    
  );
};

export default DocProfile;


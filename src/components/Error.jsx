import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import dogpic from '../Assets/dogpic.png';
import './error.css';

const Error = () => {
  useEffect(()=>{
    localStorage.removeItem("patientdbtoken");
  },[]);
  return (
    <div className="error-page">
      <div className='errbox'>
        <div className="sent">
          <h1>Uh Oh!</h1>
          <p>This page is not available 😔</p>
        </div>
        <div className="errbut">
          <Link to="/login" className="linke">Login</Link>
          <Link to="/" className="linke">Home</Link>
        </div>
      </div>

      <div className='errimg'>
        <img src={dogpic} alt="Dog Pic" />
      </div>


    </div>
  );
};

export default Error;

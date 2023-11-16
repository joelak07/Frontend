import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import doctor from "../Assets/doctor.png";
import "./confirmed.css";

function Confirmed() {
  return (
    <div className="confirmed-page">
      <div className="confirmbox">
        <div className="confirmmessage">
          <h1>Appointment Confirmed</h1>
          <p>Your health journey starts with us at Sunrise 😊 </p>
        </div>
        <div className="confimrbut">
          <Link to="/status" className="confirmlinke">
            Status
          </Link>
          <Link to="/" className="confirmlinke">
            Home
          </Link>
        </div>
      </div>

      <div className="confirmimg">
        <img src={doctor} alt="Doctor" />
      </div>
    </div>
  );
}

export default Confirmed;

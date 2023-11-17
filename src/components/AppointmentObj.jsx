import React, { useState } from 'react';
import './docdashboard.css'
const AppointmentObj = () => {

  const appointmentDetails = {
    patientName: "John Doe",
    age: "53", // Format as needed
    reasonForAppointment: "Routine checkup",
    slotTime: "10:00 AM - 10:20 AM",
  };

  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const handleViewAppointment = () => {
    setShowDiagnosis(!showDiagnosis);
  };

  return (
    <div className='appobj'>
      <h3>Patient Name: {appointmentDetails.patientName}</h3>
      <p>Age: {appointmentDetails.age}</p>
      <p>Reason for Appointment: {appointmentDetails.reasonForAppointment}</p>
      <p>Slot Time: {appointmentDetails.slotTime}</p>

      {showDiagnosis && (
        <div className="diag">
        <h3>Your diagnosis</h3>
        <textarea name="" id="" cols="159" rows="7"></textarea>
        <button className="send-report-button" style={{ backgroundColor: "green" }}>Send Report</button>
        <button className="session-completed-button" style={{ backgroundColor: "green" }}>Session Completed</button>
        <br />
        <br />
      </div>
      )}

      <button>Cancel</button>
      <button onClick={handleViewAppointment}>
        {showDiagnosis ? 'Close Appointment' : 'View Appointment'}
      </button>
    </div>
  );
}

export default AppointmentObj
import React, { useEffect, useState } from 'react';
import './docdashboard.css'
import Axios from 'axios';

const AppointmentObj = (props) => {
  const {
    _id,
    doctorId,
    appointmentDate,
    patientName,
    email,
    slot,
    reasonforappointment,
    isCompleted,
    isChanged
  } = props.obj;
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [patientAge, setPatientAge] = useState(null);

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };
  const cancelAppointment = () => {
    Axios.delete(`http://localhost:4000/appointment/deleteAppointment/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Deleted successfully");
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    Axios.get("http://localhost:4000/patient/getPatient", {
      params: { email: email, patientName: patientName },
    })
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setPatientDetails(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching patient details:", err));
  }, [email, patientName]);

  useEffect(() => {
    if (patientDetails && patientDetails.dob) {
      const age = calculateAge(patientDetails.dob);
      setPatientAge(age);
    }
  }, [patientDetails]);

  return (
    <div className='appobj'>
      <h3>Patient Name: {patientName}</h3>
      <p>Age: {patientAge !== null ? patientAge : 'N/A'}</p>
      <p>Reason for Appointment: {reasonforappointment}</p>
      <p>Slot Time: {slot}</p>

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

      <button onClick={cancelAppointment}>Cancel</button>
      <button onClick={() => setShowDiagnosis(!showDiagnosis)}>
        {showDiagnosis ? 'Close Appointment' : 'View Appointment'}
      </button>
    </div>
  );
}

export default AppointmentObj;

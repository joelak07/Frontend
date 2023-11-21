import React, { useEffect, useState } from 'react';
import './docdashboard.css';
import {toast,ToastContainer} from 'react-toastify';
import Axios from 'axios';

const MyAppointmentObj = (props) => {
  const {
    _id,
    patientName,
    email,
    slot,
    reasonforappointment,
    appointmentDate
  } = props.obj;
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
    Axios.delete(`https://hospital-appointment-backend.onrender.com/appointment/deleteAppointment/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert('Deleted successfully');
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    Axios.get('https://hospital-appointment-backend.onrender.com/patient/getPatient', {
      params: { email: email, patientName: patientName },
    })
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setPatientDetails(res.data[0]);
        }
      })
      .catch((err) => console.error('Error fetching patient details:', err));
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
      <p><b>Age: </b>{patientAge !== null ? patientAge : 'N/A'}</p>
      <p><b>Reason for Appointment:</b> {reasonforappointment}</p>
      <p><b>Appointment Date: </b>{new Date(appointmentDate).toLocaleDateString('en-GB')}</p>
      <p><b>Slot Time:</b> {slot}</p>

      <button onClick={cancelAppointment}>Cancel Appointment</button>
      <ToastContainer />
    </div>
  );
};

export default MyAppointmentObj;

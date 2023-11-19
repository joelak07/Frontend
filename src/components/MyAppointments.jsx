// MyAppointments Component - Frontend
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DocNav from './DocNav';
import "./myappointments.css";


const MyAppointments = () => {
  const [doctorId, setDoctorId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with current date

  useEffect(() => {
    console.log("MyAppointments component mounted");
    const token = localStorage.getItem('doctordbtoken');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.doctorId) {
        setDoctorId(decodedToken.doctorId);
      }
    }
    fetchAppointments(selectedDate); // Fetch appointments for the selected date
  }, [doctorId]); // Run once on component mount and whenever doctorId changes

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    await fetchAppointments(selectedDate); // Fetch appointments for the selected date
  };

  const handleSubmit = async () => {
    await fetchAppointments(selectedDate); // Fetch appointments for the selected date
  };

  const fetchAppointments = async (date) => {
    try {
      const response = await Axios.get(`http://localhost:4000/appointment/getAppointmentForDoctorByDate/${doctorId}/${date}`);
      console.log("API Response:", response.data);
      setAppointments(response.data); // Assuming response.data is an array of appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Handle error
    }
  };

  return (
    <div className='myappscont'>
      <DocNav />
      <h2 className='myapptit'>My Appointments</h2>
      <div className="myappsbox">
        <div className="searchcont">
          <div className="flexingsearch">
            <div className="datesearch">
              <label htmlFor="appointmentDate">Select Date:</label>
              <input
                type="date"
                id="appointmentDate"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="patnamesearch">
              <label htmlFor="searchPatient">Patient Name:</label>
              <input
                type="text"
                id="searchPatient"
                placeholder='Enter patient name'
              />
            </div>
            <button onClick={handleSubmit} className='myappbutt'>Search</button>
          </div>
        </div>


        {appointments.length > 0 ? (
          <div className="appsearchres">
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment._id}>
                  <p>Date: {appointment.appointmentDate}</p>
                  <p>Patient: {appointment.patientName}</p>
                  <p>Email: {appointment.email}</p>
                  <p>Slot: {appointment.slot}</p>
                  <p>Reason: {appointment.reasonforappointment}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No appointments found</p>
        )}

      </div>

    </div>
  );
};

export default MyAppointments;
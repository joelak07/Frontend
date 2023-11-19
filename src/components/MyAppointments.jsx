import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DocNav from './DocNav';
import AppointmentObj from './AppointmentObj';
import "./myappointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [patientName, setPatientName] = useState('');

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const fetchAppointments = async () => {
    try {
      console.log('Fetching appointments for date:', selectedDate);

      const token = localStorage.getItem('doctordbtoken');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.doctorId) {
          const response = await Axios.get(`http://localhost:4000/appointment/getAppointmentForDoctorByDate/${decodedToken.doctorId}/${selectedDate}/${patientName}`);

          console.log('Response:', response.data);

          if (response.status === 200) {
            setAppointments(response.data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, patientName]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const handlePatientNameChange = (event) => {
    const name = event.target.value;
    setPatientName(name);
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
                value={patientName}
                onChange={handlePatientNameChange}
              />
            </div>
            <button onClick={fetchAppointments} className='myappbutt'>Search</button>
          </div>
        </div>

        {appointments.length > 0 ? (
          <div className="appsearchres">
            <ul>
              {appointments.map((appointment) => (
                <AppointmentObj key={appointment._id} obj={appointment} />
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

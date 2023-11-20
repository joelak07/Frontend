import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DocNav from './DocNav';
import AppointmentObj from './AppointmentObj';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './myappointments.css';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [patientName, setPatientName] = useState('');
  const [arr, setArr] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [docName, setDocName] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [ongoingAppointments, setOngoingAppointments] = useState([]);

  const activeAppointments = arr.filter(appointment => !appointment.isCompleted);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('doctordbtoken');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.empId) {
          const docData = await Axios.get("http://localhost:4000/doctor/getDoctor", {
            params: { doctorId: decodedToken.empId }
          });
          if (docData.status === 200) {
            setDocName(docData.data[0].doctorName);
          }

          // Fetch appointments for the specified date
          const response = await Axios.get("http://localhost:4000/appointment/getAppointmentForDoctorByDate", {
            params: { doctorId: decodedToken.empId, date: selectedDate }
          });

          if (response.status === 200) {
            const allAppointments = response.data;

            // Filter upcoming and ongoing appointments
            const upcoming = allAppointments.filter(appointment => appointment.appointmentDate > selectedDate);
            const ongoing = allAppointments.filter(appointment => appointment.appointmentDate === selectedDate);

            setUpcomingAppointments(upcoming);
            setOngoingAppointments(ongoing);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching data");
    }
  };

  const fetchDataPatient = async () => {
    try {
      const token = localStorage.getItem('doctordbtoken');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.empId) {
          const docData = await Axios.get("http://localhost:4000/doctor/getDoctor", {
            params: { doctorId: decodedToken.empId }
          });
          if (docData.status === 200) {
            setDocName(docData.data[0].doctorName);
          }

          // Fetch appointments for the specified date and patient name
          const response = await Axios.get("http://localhost:4000/appointment/getAppointmentForDoctorByDateAndPatient", {
            params: { doctorId: decodedToken.empId, date: selectedDate, patientName }
          });

          if (response.status === 200) {
            const allAppointments = response.data;

            // Filter upcoming and ongoing appointments
            const today = new Date().toISOString().split('T')[0];
            const upcoming = allAppointments.filter(appointment => new Date(appointment.appointmentDate) > new Date(today));
            const ongoing = allAppointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const todayDate = new Date(today);

              return (
                appointmentDate.getFullYear() === todayDate.getFullYear() &&
                appointmentDate.getMonth() === todayDate.getMonth() &&
                appointmentDate.getDate() === todayDate.getDate()
              );
            });

            setUpcomingAppointments(upcoming);
            setOngoingAppointments(ongoing);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching data");
    }
  };


  const fetchAppointmentsByPatientName = async () => {
    try {
      const token = localStorage.getItem('doctordbtoken');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.empId) {
          const docData = await Axios.get("http://localhost:4000/doctor/getDoctor", {
            params: { doctorId: decodedToken.empId }
          });
          if (docData.status === 200) {
            setDocName(docData.data[0].doctorName);
          }

          // Fetch appointments for the specified date and patient name
          const response = await Axios.get("http://localhost:4000/appointment/getAppointmentForDoctorByPatientName", {
            params: { doctorId: decodedToken.empId, patientName }
          });

          if (response.status === 200) {
            const allAppointments = response.data;

            // Filter upcoming and ongoing appointments
            const today = new Date().toISOString().split('T')[0];
            const upcoming = allAppointments.filter(appointment => new Date(appointment.appointmentDate) > new Date(today));
            const ongoing = allAppointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const todayDate = new Date(today);

              return (
                appointmentDate.getFullYear() === todayDate.getFullYear() &&
                appointmentDate.getMonth() === todayDate.getMonth() &&
                appointmentDate.getDate() === todayDate.getDate()
              );
            });

            setUpcomingAppointments(upcoming);
            setOngoingAppointments(ongoing);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching data");
    }
  };


  const fetchDataAll = async () => {
    try {
      const token = localStorage.getItem('doctordbtoken');

      if (token) {
        const decodedToken = decodeToken(token);

        if (decodedToken && decodedToken.empId) {
          const docData = await Axios.get("http://localhost:4000/doctor/getDoctor", {
            params: { doctorId: decodedToken.empId }
          });

          if (docData.status === 200) {
            setDocName(docData.data[0].doctorName);
          }

          // Fetch all appointments for the logged-in doctor using the patientName route
          const response = await Axios.get("http://localhost:4000/appointment/getAppointmentForDoctorByPatientName", {
            params: { doctorId: decodedToken.empId, patientName: null }
          });

          if (response.status === 200) {
            const allAppointments = response.data;

            // Filter upcoming and ongoing appointments
            const today = new Date().toISOString().split('T')[0];
            const upcoming = allAppointments.filter(appointment => new Date(appointment.appointmentDate) > new Date(today));
            const ongoing = allAppointments.filter(appointment => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const todayDate = new Date(today);

              return (
                appointmentDate.getFullYear() === todayDate.getFullYear() &&
                appointmentDate.getMonth() === todayDate.getMonth() &&
                appointmentDate.getDate() === todayDate.getDate()
              );
            });

            setUpcomingAppointments(upcoming);
            setOngoingAppointments(ongoing);
          } else {
            console.error('Failed to fetch data');
          }
        }
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error('Error in fetchDataAll:', error);
      alert('An error occurred while fetching data');
    }
  };


  useEffect(() => {
    fetchDataAll();
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const handlePatientNameChange = (event) => {
    const name = event.target.value;
    setPatientName(name);
  };

  const ListItems = () => {
    if (!Array.isArray(upcomingAppointments)) {
      return [];
    }

    return upcomingAppointments.map((val, ind) => {
      return <AppointmentObj key={val._id} obj={val} />;
    });
  };

  const handleSearch = () => {
    if (selectedDate.trim() !== "" && patientName.trim() !== "") {
      // If both date and patient name are provided, call fetchDataPatient
      console.log("Fetching data by both date and patient name");
      fetchDataPatient();
    } else if (selectedDate.trim() !== "") {
      // If only date is provided, call fetchData
      console.log("Fetching data by date");
      fetchData();
    } else if (patientName.trim() !== "") {
      // If only patient name is provided, call fetchAppointmentsByPatientName
      console.log("Fetching data by patient name");
      fetchAppointmentsByPatientName();
    } else {
      // Handle the case when neither date nor patient name is provided
      // Display all appointments
      console.log("Fetching all data");
      fetchDataAll();
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
                value={patientName}
                onChange={handlePatientNameChange}
              />
            </div>
            <button onClick={handleSearch} className='myappbutt'>Search</button>
          </div>

          <div className="appsearchres">
            {upcomingAppointments.length === 0 ? (
              <p style={{ color: 'gray', textAlign: 'center', margin: '120px', fontSize: '1.9rem' }}>Awwww, you are free for the day :D</p>
            ) : (
              ListItems()
            )}

          </div>
          {/* <div className="appsearchres">
              <h3>Ongoing Appointments</h3>
              <ul>
                {ongoingAppointments.map((appointment) => (
                  <AppointmentObj key={appointment._id} obj={appointment} />
                ))}
              </ul>
            </div> */}


          {upcomingAppointments.length === 0 && ongoingAppointments.length === 0 && (
            <p>No appointments found</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default MyAppointments;

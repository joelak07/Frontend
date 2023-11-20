import React, { useEffect, useState } from 'react';
import DocNav from './DocNav';
import './docdashboard.css';
import AppointmentObj from './AppointmentObj';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocDashboard = () => {
  const [arr, setArr] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();
  const [docName, setDocName] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
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
            const response = await Axios.get("http://localhost:4000/appointment/getAppointmentForDoctorToday", {
              params: { doctorId: decodedToken.empId }
            });

            if (response.status === 200) {
              setArr(response.data);
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

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert hours to 12-hour format
      hours = hours % 12 || 12;

      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
      setCurrentTime(formattedTime);

      if (hours >= 5 && hours < 12) {
        setGreeting('Morning');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Afternoon');
      } else {
        setGreeting('Evening');
      }
    };

    getCurrentTime();

    // Update the current time every second
    const intervalId = setInterval(() => {
      getCurrentTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const ListItems = () => {
    if (!Array.isArray(arr)) {
      return [];
    }

    return arr.map((val, ind) => {
      return <AppointmentObj key={val._id} obj={val} />;
    });
  };

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  return (
    <div className={`maindoc ${greeting.toLowerCase()}`}>
      <DocNav />
      <div className="docdashheader">
        <h2 className='docdashTime'>Time: {currentTime}</h2>
        <h2 className='maindoctit'>Good {greeting} <span>{docName && `${docName.split(' ')[0]} ${docName.split(' ')[1]}!`}</span></h2>

      </div>
      <div className="doccontainer">
        <h2>Appointments for the day!</h2>
        <div className="dailyap" style={{ overflowY: 'auto', maxHeight: '80%' }}>
          {arr.length === 0 ? (
            <p style={{ color: 'gray', textAlign: 'center', margin: '120px', fontSize: '1.9rem' }}>Awwww, you are free for the day :D</p>
          ) : (
            ListItems()
          )}
        </div>
      </div>
    </div>
  );
}

export default DocDashboard;

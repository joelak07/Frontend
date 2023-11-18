import React, { useEffect, useState } from 'react';
import DocNav from './DocNav';
import './docdashboard.css';
import AppointmentObj from './AppointmentObj';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocDashboard = () => {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('doctordbtoken');
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken && decodedToken.empId) {
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

  const ListItems = () => {
    // Check if arr is an array before mapping
    if (!Array.isArray(arr)) {
      return []; // or any other handling you prefer when arr is not an array
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
    <div className='maindoc'>
      <DocNav />
      <div className="doccontainer">
        <h2>Appointments for the day</h2>
        <div className="dailyap" style={{ overflowY: 'auto', maxHeight: '70%' }}>
          {arr.length===0 ? (
            <p style={{ color: 'gray', textAlign: 'center' }}>No appointments for the day</p>
          ) : (
            ListItems()
          )}
        </div>
      </div>
    </div>
  );
}

export default DocDashboard;

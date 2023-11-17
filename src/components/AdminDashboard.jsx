import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
      doctorId: '',
      doctorName: '',
      specialization: '',
      qualification: '',
    });
    const [displayDoctors, setDisplayDoctors] = useState(true);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [patients, setPatients] = useState([]);
    const [displaySearch, setDisplaySearch] = useState(true);

  
    // State for tracking whether the update form is displayed
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  
    // State to store the details of the doctor being updated
    const [updatingDoctor, setUpdatingDoctor] = useState({
      doctorId: '',
      doctorName: '',
      specialization: '',
      qualification: '',
    });

  useEffect(() => {
    const token = localStorage.getItem('doctordbtoken');
    if (!token) {
      // Redirect to login if token not present
      navigate('/login');
    } else {
      // Fetch user role from token (assuming it's stored as decoded in your case)
      const decodedToken = decodeToken(token);
      if (decodedToken.role !== 'admin') {
        // Redirect if user role is not admin
        navigate('/error');
      } else {
          // Fetch the list of doctors and patients when the component mounts
          fetchDoctors();
          fetchAllPatients();
        }
      }
    }, [navigate]);        
    
    const decodeToken = (token) => {
      // Implement token decoding logic here (if not already implemented)
      // JWT decoding
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(window.atob(base64));
      return decoded;
    };
    
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:4000/doctor');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAllPatients = async () => {
    try {
      const response = await fetch('http://localhost:4000/patient');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleCreateDoctor = async () => {
    try {
      const response = await fetch('http://localhost:4000/doctor/createDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (response.ok) {
        // If the doctor is created successfully, fetch the updated list
        await fetchDoctors();
        // Clear the form fields
        setNewDoctor({
          doctorId: '',
          doctorName: '',
          specialization: '',
          qualification: '',
        });
      } else {
        console.error('Error creating doctor:', await response.json());
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  
  const handleUpdateDoctor = async () => {
    try {
      const response = await fetch(`http://localhost:4000/doctor/updateDoctor/${updatingDoctor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatingDoctor),
      });
  
      if (response.ok) {
        // If the doctor is updated successfully, fetch the updated list
        await fetchDoctors();
        // Hide the update form after successful update
        setDisplayUpdateForm(false);
        // Clear the updatingDoctor state
        setUpdatingDoctor({
          doctorId: '',
          doctorName: '',
          specialization: '',
          qualification: '',
        });
      } else {
        console.error('Error updating doctor:', await response.json());
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };
  
  const handleUpdateClick = (doctor) => {
    setUpdatingDoctor({
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorName,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      _id: doctor._id 
    });
    setDisplayUpdateForm(true);
  };

  const handleCancelUpdate = () => {
    // Clear the form fields and hide the update form
    setUpdatingDoctor({
      doctorId: '',
      doctorName: '',
      specialization: '',
      qualification: '',
    });
    setDisplayUpdateForm(false);
  };
  
  

  const handleDeleteDoctor = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/doctor/deleteDoctor/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the doctor is deleted successfully, fetch the updated list
        await fetchDoctors();
      } else {
        console.error('Error deleting doctor:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleSearchPatients = async () => {
    try {
      const response = await fetch(`http://localhost:4000/patient/getPatient?patientName=${searchCriteria}`);
      const data = await response.json();
      setPatients(data);
      setDisplaySearch(false);
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  };

  const handleClearSearch = () => {
    fetchAllPatients();
    setSearchCriteria('');
    setDisplaySearch(true);
  };

  

  const handleToggleDisplayDoctors = () => {
    setDisplayDoctors(!displayDoctors);
  };

  

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Create New Doctor</h3>
        <label>Doctor ID:</label>
        <input
          type="text"
          name="doctorId"
          value={newDoctor.doctorId}
          onChange={handleInputChange}
        />
        <label>Doctor Name:</label>
        <input
          type="text"
          name="doctorName"
          value={newDoctor.doctorName}
          onChange={handleInputChange}
        />
        <label>Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={newDoctor.specialization}
          onChange={handleInputChange}
        />
        <label>Qualification:</label>
        <input
          type="text"
          name="qualification"
          value={newDoctor.qualification}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateDoctor}>Create Doctor</button>
      </div>
      <br />
      <br />
      <div>
      <h3>Doctor List</h3>
        <button onClick={handleToggleDisplayDoctors}>
          {displayDoctors ? 'Hide Doctors' : 'Display All Doctors'}
        </button>
        {displayDoctors && (
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor._id}>
                {doctor.doctorName} - {doctor.specialization} (
                  <button onClick={() => handleUpdateClick(doctor)}>Update</button>
                  <button onClick={() => handleDeleteDoctor(doctor._id)}>Delete</button>
                )
              </li>
            ))}
          </ul>
        )}
      </div>

      {displayUpdateForm && (
        <div>
          <h3>Update Doctor</h3>
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={updatingDoctor.doctorName}
            onChange={(e) => setUpdatingDoctor({ ...updatingDoctor, doctorName: e.target.value })}
          />
          <label>Doctor ID:</label>
          <input
            type="text"
            name="doctorId"
            value={updatingDoctor.doctorId}
            onChange={(e) => setUpdatingDoctor({ ...updatingDoctor, doctorId: e.target.value })}
          />
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={updatingDoctor.specialization}
            onChange={(e) => setUpdatingDoctor({ ...updatingDoctor, specialization: e.target.value })}
          />
          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={updatingDoctor.qualification}
            onChange={(e) => setUpdatingDoctor({ ...updatingDoctor, qualification: e.target.value })}
          />
          <button onClick={handleUpdateDoctor}>Update Doctor</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
      <br />
      <br />
      <div>
        <h3>Search Patients</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        />
        {displaySearch ? (
          <button onClick={handleSearchPatients}>Search</button>
        ) : (
          <button onClick={handleClearSearch}>Clear Search</button>
        )}
      </div>

      <div>
        <h3>Patient List</h3>
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>
              {patient.patientName} - {patient.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

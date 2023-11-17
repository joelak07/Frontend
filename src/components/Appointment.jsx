import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./appointment.css";
import { ToastContainer ,toast } from "react-toastify";

const Appointment = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    appointmentDate: "",
    patientName: "",
    email: "",
    dob: "",
    address: "",
    slot: "",
    doctorId: null,
    reasonforappointment: "",
    specialties: [],
    doctors: [],
    doctorOptions: [],
    bookedSlots: [],
    specialty: ""
  });

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await fetch("http://localhost:4000/doctor/specialties");
      if (response.ok) {
        const specialties = await response.json();
        setState((prevState) => ({ ...prevState, specialties }));
      } else {
        console.error("Failed to fetch specialties");
      }
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  const fetchDoctorsBySpecialty = async (selectedSpecialty) => {
    try {
      const response = await fetch(`http://localhost:4000/doctor/specialty/${selectedSpecialty}`);
      if (response.ok) {
        const doctors = await response.json();
        setState((prevState) => ({ ...prevState, doctors, doctorOptions: [], selectedDoctorId: null }));
      } else {
        console.error("Failed to fetch doctors by specialty");
      }
    } catch (error) {
      console.error("Error fetching doctors by specialty:", error);
    }
  };

  const generateTimeSlots = () => {
    const bookedSlots = state.bookedSlots;
    const allTimeSlots = [
      "9:00 AM - 9:20 AM",
      "9:20 AM - 9:40 AM",
      "9:40 AM - 10:00 AM",
      "10:00 AM - 10:20 AM",
      "10:20 AM - 10:40 AM",
      "10:40 AM - 11:00 AM",
    ];
    const availableTimeSlots = allTimeSlots.filter((slot) => !bookedSlots.includes(slot));
    return availableTimeSlots.map((slot, index) => (
      <option key={index} value={slot}>
        {slot}
      </option>
    ));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "specialty") {
      fetchDoctorsBySpecialty(value);
      setState((prevState) => ({
        ...prevState,
        [name]: value,
        doctorName: "",
        doctorOptions: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const checkAvailability = async () => {
    try {
      const availabilityResponse = await Axios.get("http://localhost:4000/appointment/checkAvailability", {
        params: {
          doctorId: selectedDoctorId,
          appointmentDate: state.appointmentDate,
          slot: state.slot,
        },
      });
      if (availabilityResponse.status === 200) {
        const { available, message } = availabilityResponse.data;
        return { available, message };
      } else {
        throw new Error("Failed to check availability");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      throw error;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const availabilityResponse = await checkAvailability();

      if (availabilityResponse && availabilityResponse.available) {
        const data = {"email":state.email};
        const res = await Axios.post("http://localhost:4000/patientOtp/appointment/sendOtp",data);
        if (res.status===200) {
          navigate('/patient/otp', {
            state: {
              patientName: state.patientName,
              email: state.email,
              dob: state.dob,
              address: state.address,
              appointmentDate: state.appointmentDate,
              slot: state.slot,
              reasonforappointment: state.reasonforappointment,
              doctorId: selectedDoctorId,
              option: "2"
            },
          });
        }
        else {
          toast.error(res.response.data.error);
        }
      } else {
        // Slot is unavailable
        const unavailabilityMessage = availabilityResponse && availabilityResponse.message ? availabilityResponse.message : "Slot not available for this doctor at this time.";
        console.log(unavailabilityMessage);
        setAvailabilityMessage(unavailabilityMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error has occurred");
    }
  };

  const { patientName, email, dob, address, appointmentDate, slot, reasonforappointment, specialties, doctors, doctorOptions } = state;

  return (
    <div className="appcont">
      <div className="appointLog">
        <form className="appointForm" onSubmit={handleSubmit}>
          <div className="formSection">
            <div className="formGroup">
              <label htmlFor="patientName">Name:</label>
              <input type="text" id="patientName" name="patientName" value={patientName} onChange={handleChange} required />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
            </div>

            <div className="formGroup">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={dob} onChange={handleChange} required />
            </div>

            <div className="formGroup">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={address} onChange={handleChange} required />
            </div>

            <div className="formGroup">
              <label htmlFor="appointmentDate">Date:</label>
              <input type="date" id="appointmentDate" name="appointmentDate" value={appointmentDate} onChange={handleChange} required />
            </div>

            <div className="formGroup">
              <label htmlFor="slot">Time Slot:</label>
              <select id="slot" name="slot" value={slot} onChange={handleChange} required>
                <option value="" disabled>
                  Select a Time Slot
                </option>
                {generateTimeSlots()}
              </select>
            </div>
          </div>

          <div className="formSection">
            <div className="formGroup">
              <label htmlFor="specialty">Specialty:</label>
              <select id="specialty" name="specialty" value={state.specialty} onChange={handleChange} required>
                <option value="" disabled>
                  Select a Specialty
                </option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="doctorName">Doctor:</label>
              <select
                id="doctorName"
                name="doctorName"
                value={state.doctorName}
                onChange={(event) => {
                  const selectedDoctor = JSON.parse(event.target.value);
                  handleChange(event);
                  setSelectedDoctorId(selectedDoctor.doctorId);
                }}
                required
              >
                <option value="" disabled>
                  Select a Doctor
                </option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={JSON.stringify(doctor)}>
                    {doctor.doctorName}
                  </option>
                ))}
              </select>
            </div>

            {doctorOptions.length > 0 && (
              <div className="formGroup">
                <label>Availability Slots:</label>
                <ul>
                  {doctorOptions.map((slot, index) => (
                    <li key={index}>{slot}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="formGroup">
              <label htmlFor="reasonforappointment">Reason for Appointment:</label>
              <textarea id="reasonforappointment" name="reasonforappointment" value={reasonforappointment} onChange={handleChange} required></textarea>
            </div>
          </div>

          <div className="formGroup">
            <button className="appointButton" type="submit">
              Book Appointment
            </button>
          </div>

          <div className="formGroup messages">
            <p>{availabilityMessage}</p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Appointment;

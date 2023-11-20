import { useEffect, useState } from "react";
import Axios from "axios";
import "./patientObj.css";

function PatientObj(props) {
  const {
    _id,
    appointmentDate,
    email,
    patientName,
    slot,
    doctorId,
    reasonforappointment,
  } = props.obj;
  const [patientDetails, setPatientDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const [isRescheduleButtonDisabled, setIsRescheduleButtonDisabled] =
    useState(false);
  const [showRescheduleBox, setShowRescheduleBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const today = new Date().toISOString().split("T")[0];

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
    specialty: "",
  });

  const checkAvailability = async () => {
    try {
      const availabilityResponse = await Axios.get(
        "http://localhost:4000/appointment/checkAvailability",
        {
          params: {
            doctorId: doctorId,
            appointmentDate: selectedDate, // Use selectedDate instead of state.appointmentDate
            slot: selectedSlot, // Use selectedSlot instead of state.slot
          },
        }
      );
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

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate); // Update selectedDate state for rescheduling
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value); // Update selectedSlot state for rescheduling
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

  const handleCancelReschedule = () => {
    setShowRescheduleBox(false);
    // Clear selected date and slot if needed
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleRescheduleClick = () => {
    setShowRescheduleBox(true);
  };

  const confirmReschedule = async () => {
    try {
      const availabilityResponse = await checkAvailability(); // Use checkAvailability function

      if (availabilityResponse.available) {
        // Slot is available, proceed with updating the appointment
        try {
          const rescheduleResponse = await Axios.put(
            `http://localhost:4000/appointment/updateAppointment/${_id}`,
            {
              appointmentDate: selectedDate,
              slot: selectedSlot,
            }
          );

          if (rescheduleResponse.status === 200) {
            // Appointment rescheduled successfully
            alert("Appointment rescheduled successfully");
            window.location.reload();
          } else {
            alert("Failed to reschedule appointment");
          }
        } catch (error) {
          console.error("Error rescheduling appointment:", error);
          alert("Error rescheduling appointment");
        }
      } else {
        // Slot is not available, display a message to the user
        alert(availabilityResponse.message);
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      alert("Error checking availability");
    }
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

    // Fetch doctor details using the doctorId
    Axios.get("http://localhost:4000/doctor/getDoctor", {
      params: { doctorId: doctorId }, // Use doctorId from props or wherever it's coming from
    })
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setDoctorDetails(res.data[0]);
          setSelectedDoctorId(res.data[0]._id); // Update selectedDoctorId when doctor details are fetched
        }
      })
      .catch((err) => console.error("Error fetching doctor details:", err));

    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    previousDay.setHours(0, 0, 0, 0);

    const appointmentDateTime = new Date(appointmentDate);
    appointmentDateTime.setHours(0, 0, 0, 0);

    const isBeforePreviousDay = appointmentDateTime < previousDay;
    setIsCancelButtonDisabled(isBeforePreviousDay);
    setIsRescheduleButtonDisabled(isBeforePreviousDay);
  }, [email, doctorId, patientName, appointmentDate]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
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
    const availableTimeSlots = allTimeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    return availableTimeSlots.map((slot, index) => (
      <option key={index} value={slot}>
        {slot}
      </option>
    ));
  };

  return (
    <div className="appointment-details">
      <div className="appsflexin">
        <div className="gridcontainer1">
          <div className="griditem1">
            {appointmentDate && (
              <div className="field">
                <b style={{ fontSize: "1.4rem", color: "#0c356a" }}>Appointment Date: {formatDate(appointmentDate)}</b>
              </div>
            )}
          </div>
          <div className="griditem3">
            {patientDetails && (
              <div className="patient-details">
                {patientDetails.patientName && (
                  <div className="field">
                    Patient Name: {patientDetails.patientName}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="griditem4">
            {doctorDetails && (
              <div className="doctor-details">
                {doctorDetails.doctorName && (
                  <div className="field">
                    Doctor Name: {doctorDetails.doctorName}
                  </div>
                )}
              </div>
            )}
          </div>



        </div>
        <div className="gridcontainer2">
          <div className="griditem2">
            {slot && <div className="field"><b style={{ fontSize: "1.4rem", color: "#0c356a" }}>Slot: {slot}</b></div>}
          </div>


          <div className="griditem5">
            {doctorDetails && (
              <div className="doctor-details">
                {doctorDetails.specialization && (
                  <div className="field">
                    Specialization: {doctorDetails.specialization}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="griditem6">
            {reasonforappointment && (
              <div className="additional-details">
                <div className="field">
                  {" "}
                  Additional Details: {reasonforappointment}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="gridcontainer3">
          <div className="griditem7">
            <button
              className="patientobjbutton"
              disabled={isRescheduleButtonDisabled}
              onClick={handleRescheduleClick} // Trigger reschedule box
            >
              Reschedule
            </button>
          </div>

          <div className="griditem8">
            <button
              onClick={cancelAppointment}
              disabled={isCancelButtonDisabled}
              className="patientobjbuttons"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {showRescheduleBox && (
        <div className="reschedule-box">
          <h2>Reschedule Appointment</h2>
          {/* Date and slot selectors */}
          <input type="date" onChange={handleDateChange} min={today} />
          <select onChange={handleSlotChange} defaultValue="">
            <option value="" disabled>
              Select a Time Slot
            </option>
            {generateTimeSlots()}
          </select>
          {/* Confirm and cancel reschedule buttons */}
          <button onClick={confirmReschedule}>Confirm Reschedule</button>
          <button onClick={handleCancelReschedule}>
            Cancel Reschedule
          </button>
        </div>
      )}
      <br />
    </div>
  );
}

export default PatientObj;


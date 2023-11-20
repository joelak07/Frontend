import { useEffect, useState } from "react";
import Axios from "axios";

function PatientObjPrev(props) {
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
  const [isRescheduleButtonDisabled, setIsRescheduleButtonDisabled] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

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

    Axios.get("http://localhost:4000/doctor/getDoctor", {
      params: { doctorId: doctorId },
    })
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setDoctorDetails(res.data[0]);
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

  return (
    <div className="appointment-details">
      <div className="headingappoint">
        <p className="section-title">
          <b> Appointment Details</b>
        </p>
      </div>
      <div className="gridcontainer">
        <div className="">
          {appointmentDate && (
            <div className="field">
              Appointment Date: {formatDate(appointmentDate)}
            </div>
          )}
        </div>
        <div className="">
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

        {isDetailsVisible && (
          <>
            <div className="">
              {slot && <div className="field">Slot: {slot}</div>}
            </div>

            <div className="">
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

            <div className="">
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

            <div className="">
              {reasonforappointment && (
                <div className="additional-details">
                  <div className="field">
                    Additional Details: {reasonforappointment}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="">
          <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
            {isDetailsVisible ? "Hide Details" : "View Details"}
          </button>
        </div>

      </div>

      <br />
    </div>
  );
}

export default PatientObjPrev;

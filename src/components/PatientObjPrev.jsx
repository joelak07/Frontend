import { useEffect, useState } from "react";
import Axios from "axios";

function PatientObjPrev(props) {
  const {
    appointmentDate,
    email,
    patientName,
    slot,
    doctorId,
    reasonforappointment,
  } = props.obj;
  const [patientDetails, setPatientDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

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
  }, [email, doctorId, patientName, appointmentDate]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <td>
        {appointmentDate && (
          <div>
            {formatDate(appointmentDate)}
            {isDetailsVisible && slot && <p>{slot}</p>}
          </div>
        )}
      </td>

      <td>
        {patientName && (
          <div>
            {patientName}
            {isDetailsVisible && (
              <div>
                {patientDetails && patientDetails.dob && (
                  <p>{formatDate(patientDetails.dob)}</p>
                )}
                {patientDetails && patientDetails.address && (
                  <p>{patientDetails.address}</p>
                )}
                {email && <p>{email}</p>}
              </div>
            )}
          </div>
        )}
      </td>

      <td>
        {doctorDetails && doctorDetails.doctorName && (
          <div>
            {doctorDetails.doctorName}
            {isDetailsVisible && (
              <div>
                {doctorDetails.specialization && (
                  <p>{doctorDetails.specialization}</p>
                )}
                {reasonforappointment && (
                  <p>{reasonforappointment}</p>
                )}
              </div>
            )}
          </div>
        )}
      </td>

      <td>
        <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
          {isDetailsVisible ? "Hide Details" : "View Details"}
        </button>
      </td>
    </div>
  );
}

export default PatientObjPrev;

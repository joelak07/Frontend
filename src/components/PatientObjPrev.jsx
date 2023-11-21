import { useEffect, useState } from "react";
import Axios from "axios";
import "./patientObjPrev.css";

function PatientObjPrev(props) {
  const [isShown, setIsShown] = useState(false);
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
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const [isRescheduleButtonDisabled, setIsRescheduleButtonDisabled] =
    useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    Axios.get("https://hospital-appointment-backend.onrender.com/patient/getPatient", {
      params: { email: email, patientName: patientName },
    })
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setPatientDetails(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching patient details:", err));

    Axios.get("https://hospital-appointment-backend.onrender.com/doctor/getDoctor", {
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
    <tr className="newrowprevmain">
      <td className="apposslotprev">
        {appointmentDate && (
          <div>
            <div
              style={{
                fontSize: "1.4rem",
                color: "#0c356a",
                fontWeight: "bold",
              }}
            >
              {formatDate(appointmentDate)}
            </div>
            {isShown && <div> {slot && <div> Slot: {slot}</div>}</div>}
          </div>
        )}
      </td>
      <td className="apposnameprev">
        {patientName && (
          <div>
            <div
              style={{
                fontSize: "1.4rem",
                color: "#0c356a",
                marginLeft: "4px",
                fontWeight: "bold",
              }}
            >
              {" "}
              {doctorDetails && (<div>{doctorDetails.doctorName}</div>)}
            </div>
            {isShown && (
              <div>
                {patientName && (
                  <div className="doctordetailsprev">
                    {patientName && (
                      <div className="fieldprev">
                        Patient Name: {patientName}
                      </div>
                    )}
                  </div>
                )}
                {doctorDetails && (
                  <div className="doctordetailsprev">
                    {doctorDetails.specialization && (
                      <div className="fieldprev">
                        Department: {doctorDetails.specialization}
                      </div>
                    )}
                  </div>
                )}
                {reasonforappointment && (
                  <div className="additionaldetailsprev">
                    <div className="fieldprev">
                      {" "}
                      Additional Details: {reasonforappointment}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </td>
      <td className="hideviewapposenior">
        <button className="hideviewtest" onClick={() => setIsShown(!isShown)}>
          {isShown ? "Hide" : "View"}
        </button>
      </td>
    </tr>
  );
}

export default PatientObjPrev;

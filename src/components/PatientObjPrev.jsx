import { useEffect, useState } from "react";
import Axios from "axios";
import "./patientObjPrev.css";

function PatientObjPrev(props) {
  const [isShown, setIsShown] = useState(false);
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
    <div>
      <td className="apposslotprev">
        {appointmentDate && (
          <div>
            Date: {formatDate(appointmentDate)}
            {isShown && <div> {slot && <div> Slot: {slot}</div>}</div>}
          </div>
        )}
      </td>
      <td className="apposnameprev">
        {patientName && (
          <div>
            Patient Name: {patientName}
            {isShown && (
              <div>
                {doctorDetails && (
                  <div className="doctordetailsprev">
                    {doctorDetails.doctorName && (
                      <div className="fieldprev">
                        Doctor Name: {doctorDetails.doctorName}
                      </div>
                    )}
                  </div>
                )}
                {doctorDetails && (
                  <div className="doctordetailsprev">
                    {doctorDetails.specialization && (
                      <div className="fieldprev">
                        Specialization: {doctorDetails.specialization}
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
      <td>
        <button className="hideviewtest" onClick={() => setIsShown(!isShown)}>
          {isShown ? "Hide" : "View"}
        </button>
      </td>
    </div>
  );
}

export default PatientObjPrev;

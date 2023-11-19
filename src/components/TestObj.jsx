import { useEffect, useState } from "react";
import Axios from "axios";
import "./patientObj.css";

function PatientObj(props) {
  const {
    _id,
    testName,
    email,
    testDate,
    slot,
    dob,
    patientName,
    address
  } = props.obj;
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);

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
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    previousDay.setHours(0, 0, 0, 0);

    const testDateTime = new Date(testDate);
    testDateTime.setHours(0, 0, 0, 0);

    const isBeforePreviousDay = testDateTime < previousDay;
    setIsCancelButtonDisabled(isBeforePreviousDay);
  }, [email, patientName, testDate]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="appointment-details">
      <div className="headingappoint">
        <p className="section-title">
          <b> Test Details</b>
        </p>
      </div>
      <div className="gridcontainer">
        <div className="griditem1">
          {testDate && (
            <div className="field">
              Appointment Date: {formatDate(testDate)}
            </div>
          )}
        </div>
        <div className="griditem2">
          {slot && <div className="field">Slot: {slot}</div>}
        </div>

        <div className="griditem3">
              {patientName && (
                <div className="field">
                  Patient Name: {patientName}
                </div>
              )}
        </div>

        <div className="griditem4">
              {testName && (
                <div className="field">
                  Test Name: {testName}
                </div>
              )}
        </div>
        <div className="griditem7">
          <button className="patientobjbutton">Reschedule</button>
        </div>

        <div className="griditem8">
          <button
            onClick={cancelAppointment}
            disabled={isCancelButtonDisabled}
            className="patientobjbutton"
          >
            Cancel
          </button>
        </div>
      </div>

      <br />
    </div>
  );
}

export default PatientObj;

import { useEffect, useState } from "react";
import Axios from "axios";
import './testobj.css'

function TestObj(props) {
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
  const [isRescheduleButtonDisabled, setIsRescheduleButtonDisabled] = useState(false);
  const [showTestAppointmentRescheduleBox, setShowTestAppointmentRescheduleBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isTestRescheduleButtonDisabled, setIsTestRescheduleButtonDisabled] = useState(false);
  const today = new Date().toISOString().split('T')[0];



  const cancelTest = () => {
    Axios.delete(`http://localhost:4000/test/deleteTestAppointment/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Deleted successfully");
          window.location.reload();
        } else {
          alert("Failed to delete test appointment");
        }
      })
      .catch((err) => alert(err));
  };

  const handleTestRescheduleClick = () => {
    setShowTestAppointmentRescheduleBox(true);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleCancelReschedule = () => {
    setShowTestAppointmentRescheduleBox(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const confirmReschedule = async () => {
    try {
      if (!selectedDate || !selectedSlot) {
        alert("Please select a date and slot for rescheduling.");
        return;
      }

      const isAvailable = await checkTestAvailability(selectedSlot);

      if (isAvailable) {
        const rescheduleResponse = await Axios.put(`http://localhost:4000/test/updateTestAppointment/${_id}`, {
          testDate: selectedDate,
          slot: selectedSlot,
        });

        if (rescheduleResponse.status === 200) {
          alert("Test appointment rescheduled successfully");
          window.location.reload();
        } else {
          alert("Failed to reschedule test appointment");
        }
      } else {
        alert("Slot not available for this test at this time");
      }
    } catch (error) {
      console.error("Error rescheduling test appointment:", error);
      alert("Error rescheduling test appointment");
    }
  };

  useEffect(() => {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    previousDay.setHours(0, 0, 0, 0);

    const testDateTime = new Date(testDate);
    testDateTime.setHours(0, 0, 0, 0);

    const isBeforePreviousDay = testDateTime < previousDay;
    setIsCancelButtonDisabled(isBeforePreviousDay);
    setIsRescheduleButtonDisabled(isBeforePreviousDay);
  }, [email, patientName, testDate]);

  const checkTestAvailability = async (selectedSlot) => {
    try {
      const response = await Axios.get("http://localhost:4000/test/checkAvailability", {
        params: {
          testDate: selectedDate,
          slot: selectedSlot,
        },
      });

      if (response.status === 200) {
        return response.data.available;
      } else {
        throw new Error("Failed to check test availability");
      }
    } catch (error) {
      console.error("Error checking test availability:", error);
      throw error;
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="test-detailss">
      <div className="testflex">
        <div className="testcont1">
            <div className="griditem4">
              {testName && (
                <div className="field">
                  <b  style={{ fontSize: "1.4rem", color: "#0c356a" }}>Test Name: {testName}</b>
                </div>
              )}
            </div>
            <div className="griditem3">
              {patientName && (
                <div className="field">
                  Patient Name: {patientName}
                </div>
              )}
            </div>
          </div>
          <div className="testcont2">
            <div className="griditem1">
              {testDate && (
                <div className="field">
                  <b style={{ fontSize: "1.4rem", color: "#0c356a" }}>Appointment Date: {formatDate(testDate)}</b>
                </div>
              )}
            </div>
            <div className="griditem2">
              {slot && <div className="field">Slot: {slot}</div>}
            </div>
          </div>
          <div className="testcont3">

            <div className="test-griditem7">
              <button
                className="testobjbutton"
                disabled={isTestRescheduleButtonDisabled}
                onClick={handleTestRescheduleClick}
              >
                Reschedule
              </button>
            </div>

            <div className="griditem8">
              <button
                onClick={cancelTest}
                disabled={isCancelButtonDisabled}
                className="testobjbutton"
              >
                Cancel
              </button>
            </div>
        </div>
      </div>
      {showTestAppointmentRescheduleBox && (
                <div className="reschedule-box">
                  <h2>Reschedule Test</h2>
                  <input type="date" onChange={handleDateChange} min={today} />
                  <select onChange={handleSlotChange} defaultValue="">
                    <option value="" disabled hidden>
                      Select Slot
                    </option>
                    <option value="08:00">08:00 - 08:10</option>
                    <option value="08:10">08:10 - 08:20</option>
                    <option value="08:20">08:20 - 08:30</option>
                    <option value="08:30">08:30 - 08:40</option>
                    <option value="08:40">08:40 - 08:50</option>
                    <option value="08:50">08:50 - 09:00</option>
                  </select>
                  <button onClick={confirmReschedule}>Confirm Reschedule</button>
                  <button onClick={handleCancelReschedule}>Cancel Reschedule</button>
                </div>
              )}

      <br />
    </div>
  );
}

export default TestObj;

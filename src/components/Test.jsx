import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./test.css";
import { toast, ToastContainer } from "react-toastify";

const Test = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    testName: "",
    patientName: "",
    email: "",
    dob: "",
    address: "",
    testDate: "",
    availableSlots: [],
  });

  //test

  const [selectedSlot, setSelectedSlot] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { testName, testDate, dob, email, address } = state;

      if (!selectedSlot) {
        console.log("Please select a slot for the test.");
        return;
      }

      const isAvailable = await checkSlotAvailability(selectedSlot);

      if (isAvailable) {
        console.log("Slot not available for this date and time.");
        return;
      }

      const formattedTestDate = new Date(testDate).toISOString();
      const formattedDOB = new Date(dob).toISOString();

      const response = await Axios.get("http://localhost:4000/test/checkAvailability", {
        params: {
          testName,
          testDate: formattedTestDate,
          dob: formattedDOB,
          slot: selectedSlot,
        },
      });

      if (!response.data.available) {
        toast.error("Sorry, slot not available");
        return;
      }
      else {
        setLoading(true);
      }

      const dataToSend = {
        testName: testName,
        email: email,
        testDate: formattedTestDate,
        slot: selectedSlot,
        dob: formattedDOB,
        patientName: state.patientName,
        address: state.address,
        option: "3"
      };
      const data = { "email": email };
      const res = await Axios.post("http://localhost:4000/patientOtp/appointment/sendOtp", data);
      if (res.status === 200) {
        navigate('/patient/otp', { state: dataToSend });
      }
      else {
        toast.error("Error has occured");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const checkSlotAvailability = async (selectedSlot) => {
    try {
      const { testName, testDate, dob } = state;
      const formattedTestDate = new Date(testDate).toISOString();
      const formattedDOB = new Date(dob).toISOString();

      const response = await Axios.get("http://localhost:4000/test/checkAvailability", {
        params: {
          testName,
          testDate: formattedTestDate,
          dob: formattedDOB,
          slot: selectedSlot,
        },
      });

      return response.data.isAvailable;
    } catch (error) {
      console.error("Error checking slot availability:", error);
      throw error;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSlotSelection = async (event) => {
    const { value } = event.target;
    setSelectedSlot(value);
  };

  const { testName, patientName, email, dob, address, testDate } = state;

  return (
    <div className="appcont">
      <div className="appcon">
        <div className="testBookingContainer">
          <div className="heading">
            <h1>Book A Test</h1>
          </div>
          <div className="testBookingForm">
            <form onSubmit={handleSubmit}>
              <div className="testsubdiv1">
                <label htmlFor="testName" className="testlbl">
                  Select Test:
                </label>
                <select
                  id="testName"
                  name="testName"
                  value={testName}
                  onChange={handleChange}
                  required
                  className="testselect"
                  placeholder="Select Test"
                >
                  <option value="" disabled>
                    Select Test
                  </option>
                  <option value="Sugar Test">Sugar Test</option>
                  <option value="BP Test">BP Test</option>
                  <option value="Cholesterol Test">Cholesterol Test</option>
                  <option value="Corona Test">Corona Test</option>
                </select>
              </div>
              <div className="testsubdiv2">
                <label htmlFor="patientName" className="testlbl">
                  Patient Name:
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={patientName}
                  onChange={handleChange}
                  required
                  className="testinp"
                  placeholder="Enter Patient Name"
                />
              </div>
              <div className="testsubdiv3">
                <label htmlFor="email" className="testlbl">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="testinp"
                  placeholder="Enter Patient Email"
                />
              </div>
              <div className="testsubdiv4">
                <label htmlFor="dob" className="testlbl">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  max={today}
                  onChange={handleChange}
                  required
                  className="testdate"
                  placeholder="Select Date of Birth"
                />
              </div>
              <div className="testsubdiv5">
                <label htmlFor="address" className="testlbl">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  required
                  className="testinp"
                  placeholder="Enter Patient Address"
                />
              </div>
              <div className="testsubdiv6">
                <label htmlFor="testDate" className="testlbl">
                  Test Date:
                </label>
                <input
                  type="date"
                  id="testDate"
                  name="testdate"
                  value={testDate}
                  min={today}
                  onChange={handleChange}
                  required
                  className="testdate"
                  placeholder="Select Test Date"
                />
              </div>
              <div className="testsubdiv7">
                <label htmlFor="selectedSlot" className="testlbl">
                  Time Slot:
                </label>
                <select
                  id="selectedSlot"
                  name="selectedSlot"
                  value={selectedSlot}
                  onChange={handleSlotSelection}
                  required
                  className="testselect"
                  placeholder="Select Slot"
                >
                  <option value="" disabled>
                    Select Slot
                  </option>
                  <option value="08:00">08:00 - 08:10</option>
                  <option value="08:10">08:10 - 08:20</option>
                  <option value="08:20">08:20 - 08:30</option>
                  <option value="08:30">08:30 - 08:40</option>
                  <option value="08:40">08:40 - 08:50</option>
                  <option value="08:50">08:50 - 09:00</option>
                </select>
              </div>

              <div className="testsubdiv8">
                <button className="testButton" type="submit" disabled={loading}>
                  {loading ? <div className="spinnertest"></div> : 'Book Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};



export default Test;

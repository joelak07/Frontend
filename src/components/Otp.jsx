import React, { useState, useRef, useEffect } from 'react';
import './otp.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < otp.length - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleInputKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text').trim().slice(0, 6).split('');
    setOtp(pastedText);
    event.preventDefault();
  };

  const loginPatient = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp === '') {
      toast.error('Enter your OTP');
    } else if (!/^\d+$/.test(enteredOtp)) {
      toast.error('Enter valid OTP (numeric characters only)');
    } else if (enteredOtp.length !== 6) {
      toast.error('OTP length should be 6');
    } else {
      setLoading(true);
      const data = {
        otp: enteredOtp,
        email: location.state.email,
        option: location.state.option
      };
      try {
        const response = await Axios.post('https://hospital-appointment-backend.onrender.com/patientOtp/status', data);
        if (response.status === 200) {
          if (location.state.option === "1") {
            localStorage.setItem('patientdbtoken', response.data.userToken);
            toast.success(response.data.message);

            setTimeout(() => {
              navigate('/verifiedStatus', { state: data.email });
            }, 2000);
          }
          else if (location.state.option === "2") {
            const patientResponse = await Axios.post("https://hospital-appointment-backend.onrender.com/patient/createPatient", {
              patientName: location.state.patientName,
              email: location.state.email,
              dob: location.state.dob,
              address: location.state.address,
            });
            if (patientResponse.status === 200) {
              const appointmentResponse = await Axios.post("https://hospital-appointment-backend.onrender.com/appointment/createAppointment", {
                appointmentDate: location.state.appointmentDate,
                patientName: location.state.patientName,
                email: location.state.email,
                slot: location.state.slot,
                doctorId: location.state.doctorId,
                reasonforappointment: location.state.reasonforappointment,
                isCompleted: false,
                isChanged: false,
                doctorName: location.state.doctorName
              });
              if (appointmentResponse.status === 200) {
                localStorage.setItem('patientdbtoken', response.data.userToken);
                toast.success(response.data.message);
                setTimeout(() => {
                  navigate('/confirmed', { state:{option: "2"} });
                }, 2000);
              }
              else {
                toast.error("Appointment not created");
              }
            }
            else {
              toast.error("Patient not created");
            }
          }
          else if (location.state.option==="3") {
            const testResponse = await Axios.post("https://hospital-appointment-backend.onrender.com/test/createTestAppointment", {
              testName:location.state.testName,
              email:location.state.email,
              testDate: location.state.testDate,
              slot: location.state.slot,
              dob: location.state.dob,
              patientName: location.state.patientName,
              address: location.state.address,
            });
            if (testResponse.status===200) {
              localStorage.setItem('patientdbtoken', response.data.userToken);
              toast.success("Test successfully scheduled");
              setTimeout(() => {
                navigate('/confirmed', { state:{option: "3"} });
              }, 2000);
            }
            else {
              toast.error("Test not created");
            }
          }
        } else {
          toast.error('Error during OTP verification');
        }
      } catch (error) {
        console.error(error);
        toast.error('Incorrect OTP');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="otpContainer">
      <div className="otpBox">
        <form>
          <h1>Enter your OTP</h1>
          <br />
          <br />
          <div className="otpFormInput">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index + 1}`}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(index, e)}
                maxLength="1"
                onPaste={handlePaste}
                ref={(input) => (inputRefs.current[index] = input)}
              />
            ))}
          </div>
          <br />
          <br />
          <button className="btnotp" onClick={loginPatient} disabled={loading}>
            {loading ? <div className="spinnerotp"></div> : 'Verify OTP'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;

import { useState, useRef } from 'react';
import './otp.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

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
      const data = {
        otp: enteredOtp,
        email: location.state.email,
      };
      console.log(data);
      try {
        const response = await Axios.post('http://localhost:4000/patientOtp/status', data);
      
        if (response.status === 200) {
          if (location.state.option==="1") {
            localStorage.setItem('patientdbtoken', response.data.userToken);
            toast.success(response.data.message);
        
            setTimeout(() => {
              navigate('/verifiedStatus', { state: data.email });
            }, 2000);
          }
          else if (location.state.option==="2") {
            console.log(location.state);
            const patientResponse = await Axios.post("http://localhost:4000/patient/createPatient", {
            patientName: location.state.patientName,
            email: location.state.email,
            dob: location.state.dob,
            address: location.state.address,
            });
            if (patientResponse.status === 200) {
              const appointmentResponse = await Axios.post("http://localhost:4000/appointment/createAppointment", {
                appointmentDate: location.state.appointmentDate,
                patientName: location.state.patientName,
                email: location.state.email,
                slot: location.state.slot,
                doctorId: location.state.doctorId,
                reasonforappointment: location.state.reasonforappointment,
                isCompleted: false,
                isModified: false
              });
              if (appointmentResponse.status === 200) {
                localStorage.setItem('patientdbtoken', response.data.userToken);
                toast.success("Appointment has been scheduled");
                setTimeout(() => {
                  navigate('/confirmed', { state: data.email });
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
        } else {
          toast.error('Error during OTP verification');
        }
      } catch (error) {
        console.error(error);
        toast.error('Incorrect OTP');
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
                ref={(input) => (inputRefs.current[index] = input)}
              />
            ))}
          </div>
          <br />
          <br />
          <button className="btnotp" onClick={loginPatient}>
            Verify OTP
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;

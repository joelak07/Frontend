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
        email: location.state,
      };

      Axios.post('http://localhost:4000/patientOtp/status', data)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('patientdbtoken', res.data.userToken);
            toast.success(res.data.message);
            setTimeout(() => {
              navigate('/verifiedStatus', { state: data.email });
            }, 5000);
          } else {
            // Handle other status codes if needed
            toast.error('Error during OTP verification');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Incorrect OTP');
        });
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

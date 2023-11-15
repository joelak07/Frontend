import React, { useState, useEffect } from 'react';
import './status.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";

const Status = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("patientdbtoken");
  }, []);

  const sendOTP = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Enter your email");
    } else if (!email.includes('@')) {
      toast.error("Enter a valid email");
    } else {
      setLoading(true); 
      const data = { "email": email };
      console.log(data);
      try {
        const res = await Axios.post("http://localhost:4000/patientOtp/sendOtp", data);
        if (res.status === 200) {
          toast.success("OTP has been sent");
          navigate("/patient/otp", { state: email });
        } else {
          toast.error(res.response.data.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="statusContainer">
      <div className="statcon">
        <div className="statdes">
          <h1>Check <br /> your <br /> appointment <br /> status <br /> here!</h1>
        </div>
        <div className="statusLogBox">
          <form>
            <div className="statusFormInput">
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' />
            </div>
            <button className="stbtn" onClick={sendOTP} disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Send OTP'}
            </button>
            <br />
            <br />
            <p>Don't have an appointment ? <Link to="/appointment" className='linkst'>Book now</Link></p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Status;

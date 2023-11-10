import React, { useState } from 'react';
import './status.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";

const Status = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const sendOTP = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Enter your email");
    }
    else if (!email.includes('@')) {
      toast.error("Enter valid email");
    }
    else {
      const data = { "email": email };
      console.log(data);
      Axios.post("http://localhost:4000/patientOtp/sendOtp", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("OTP has been sent");
            navigate("/patient/otp", { state: email });
          }
          else {
            toast.error(res.response.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("error");
        });
    }
  }

  return (
    <div class="statusContainer">
      <div className="statcon">
        <div className="statdes">
          <h1>Check <br /> your <br /> appointment <br /> status <br /> here!</h1>
        </div>
        <div class="statusLogBox">
          <form>
            <div class="statusFormInput">
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' />
            </div>
            <button class="stbtn" onClick={sendOTP}>Send OTP</button>
            <p>Don't have an appointment ? <Link to="/appointment" className='linkst'>Book now</Link></p>
          </form>
          <ToastContainer />
        </div>
      </div>

    </div>
  )
}

export default Status;
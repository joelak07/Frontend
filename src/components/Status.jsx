import React, { useState } from 'react';
import './status.css';
import { toast, ToastContainer } from 'react-toastify';

const Status = () => {
  const [email, setEmail] = useState('');
  console.log(email);

  const sendOTP = (e)=>{
    e.preventDefault();
    if (email==="") {
      toast.error("Enter your email");
    }
    else if(!email.includes('@')) {
      toast.error("Enter valid email");
    }
  }

  return (
    <div class="statusContainer">
      <div class="statusLogBox">
        <div class="statusFormHeading">
          Enter your email
        </div>
        <form>
          <div class="statusFormInput">
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='' onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <button class="btn" onClick={sendOTP}>Send OTP</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Status;
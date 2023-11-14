import { useState } from 'react';
import './otp.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

const Otp = () =>{
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const loginPatient = async(e) => {
        e.preventDefault();
        if (otp==="") {
            toast.error("Enter your otp");
        }
        else if (!/[^a-zA-Z]/.test(otp)) {
            toast.error("Enter valid otp");
        }
        else if (otp.length!==6) {
            toast.error("Otp length: 6");
        }
        else {
            const data = {
                otp,email:location.state
            }
            console.log(data);
            Axios.post("http://localhost:4000/patientOtp/status", data)
            .then((res)=>{
              if (res.status===200) {
                localStorage.setItem("patientdbtoken",res.data.userToken);
                toast.success(res.data.message);
                setTimeout(()=>{
                    navigate("/verifiedStatus",{state:data.email});
                },5000);
              }
              else {
              }
            })
            .catch((err)=>{
              console.log(err);
              toast.error("error");
            });
        }
    }

    return(
        <div class="otpContainer">
          <div class="otpBox">
            <form>
              <div class="otpFormInput">
                <input type='text' name='otp' onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' />
              </div>
              <br />
              <button class="btnotp" onClick={loginPatient}>Verify OTP</button>
            </form>
          </div>
          <ToastContainer />
        </div>
    )
}

export default Otp;
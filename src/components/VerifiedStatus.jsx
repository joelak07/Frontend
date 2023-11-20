import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObj from "./PatientObj";
import TestObj from "./TestObj";
import "./verifiedStatus.css";

function VerifiedStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [showAppointments, setShowAppointments] = useState(true);

  useEffect(() => {
    const patientValid = () => {
      let token = localStorage.getItem("patientdbtoken");
      if (token) {
        console.log("User valid");
        console.log(location.state);
        Axios.get("http://localhost:4000/appointment/getAppointment", {
          params: { email: location.state, isCompleted: false },
        })
          .then((res) => {
            if (res.status === 200) {
              setArr1(res.data);
            } else {
              Promise.reject();
            }
          })
          .catch((err) => alert(err));
        Axios.get("http://localhost:4000/test/getTestAppointments", {
          params: { email: location.state, option: 1 },
        })
          .then((res) => {
            if (res.status === 200) {
              setArr2(res.data);
            } else {
              Promise.reject();
            }
          })
          .catch((err) => alert(err));
      } else {
        console.log("invalid details");
        // navigate("*");
      }
    };
    patientValid();
  }, [navigate, location.state]);

  const ListItems1 = () => {
    return arr1.map((val, ind) => {
      return <PatientObj key={val._id} obj={val} />;
    });
  };

  const ListItems2 = () => {
    return arr2.map((val, ind) => {
      return <TestObj key={val._id} obj={val} />;
    });
  };

  const goPrev = () => {
    navigate("/previousStatus", { state: location.state });
  };

  return (
    <div className="verifiedcont">
      <div className="verifiedcon">
        <button className="gotoprevbutton" onClick={goPrev}>
          Previous 
        </button>
        <div className="headingverified">
          <button onClick={() => setShowAppointments(true)}><h1>Appointments</h1></button>
          <button onClick={() => setShowAppointments(false)}><h1>Tests</h1></button>
        </div>

        <div className="appos" style={{ display: showAppointments ? 'block' : 'none' }}>
          {ListItems1()}
        </div>

        <div className="testos" style={{ display: showAppointments ? 'none' : 'block' }}>
          {ListItems2()}
        </div>
      </div>
    </div>
  );
}

export default VerifiedStatus;

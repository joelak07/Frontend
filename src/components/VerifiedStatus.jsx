import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObj from "./PatientObj";
import TestObj from "./TestObj";
import "./verifiedStatus.css";

function VerifiedStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  useEffect(() => {
    const patientValid = () => {
      let token = localStorage.getItem("patientdbtoken");
      if (token) {
        console.log("User valid");
        console.log(location.state);
        Axios.get("http://localhost:4000/appointment/getAppointment", {
          params: { email: location.state, isCompleted:false },
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
          params: { email: location.state, option:1 },
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
        navigate("*");
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
  return (
    <div className="verifiedcont">
      <Link to="/previousStatus">Previous</Link>
      <div className="verifiedcon">
        <div className="headingverified">
          <h1>View your Appointments</h1>
        </div>
        <div>{ListItems1()}</div>
      </div>
      <div className="verifiedcon">
        <div className="headingverified">
          <h1>Test Booked</h1>
        </div>
        <div>{ListItems2()}</div>
      </div>
    </div>
  );
}

export default VerifiedStatus;

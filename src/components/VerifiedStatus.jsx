import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObj from "./PatientObj";
import "./verifiedStatus.css";

function VerifiedStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const patientValid = () => {
      let token = localStorage.getItem("patientdbtoken");
      if (token) {
        console.log("User valid");
        console.log(location.state);
        Axios.get("http://localhost:4000/appointment/getAppointment", {
          params: { email: location.state },
        })
          .then((res) => {
            if (res.status === 200) {
              setArr(res.data);
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
  }, [navigate]);
  const ListItems = () => {
    return arr.map((val, ind) => {
      return <PatientObj key={val._id} obj={val} />;
    });
  };
  return (
    <div className="verifiedcont">
      <div className="verifiedcon">
        <div className="headingverified">
          <h1>View your Appointments</h1>
        </div>
        <div>{ListItems()}</div>
      </div>
    </div>
  );
}

export default VerifiedStatus;

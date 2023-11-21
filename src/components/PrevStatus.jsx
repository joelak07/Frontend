import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObjPrev from "./PatientObjPrev";
import TestObjPrev from "./TestObjPrev";
import "./prevStatus.css";
import { border } from "@mui/system";

function PrevStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [showAppointments, setShowAppointments] = useState(true);

  const goToUpcoming = () => {
    navigate("/verifiedStatus", { state: location.state });
  };

  useEffect(() => {
    const patientValid = () => {
      let token = localStorage.getItem("patientdbtoken");
      if (token) {
        console.log("User valid");
        console.log(location.state);
        Axios.get("http://localhost:4000/appointment/getAppointment", {
          params: { email: location.state, isCompleted: true },
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
          params: { email: location.state, option: 2 },
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
      return <PatientObjPrev key={val._id} obj={val} />;
    });
  };

  const ListItems2 = () => {
    return arr2.map((val, ind) => {
      return <TestObjPrev key={val._id} obj={val} />;
    });
  };

  return (
    <div className="previouscont">
      <div className="previouscon">
        <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
        <button className="gotoupcombutton" onClick={goToUpcoming} style={{marginLeft:"auto"}}>
          Upcoming
        </button>
        </div>
        <div className="headingprevious">
          <button
            onClick={() => setShowAppointments(true)}
            className={` ${showAppointments ? "clickity" : "vesbuta"}`}
          >
            <h1>Appointments</h1>
          </button>
          <button
            onClick={() => setShowAppointments(false)}
            className={` ${!showAppointments ? "testity" : "vesbutt"}`}
          >
            <h1>Tests</h1>
          </button>
        </div>
        { showAppointments &&
        <div className="previousconinside">
          <table
            className="apposprev"
            style={
              ({ borderSpacing: "10px" })
            }
          >
            {ListItems1()}
          </table>
        </div>
        }
        { !showAppointments &&
        <div className="testconinside">
          <table
            className="testisprev"
            style={
              ({ borderSpacing: "10px" })
            }
          >
            {ListItems2()}
          </table>
        </div>
        }
      </div>
    </div>
  );
}

export default PrevStatus;

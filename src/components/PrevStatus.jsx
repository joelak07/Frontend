import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObjPrev from "./PatientObjPrev";
import TestObjPrev from "./TestObjPrev";

function PrevStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

  const goToUpcoming = () => {
    navigate('/verifiedStatus', { state: location.state });
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
      return <tr><TestObjPrev key={val._id} obj={val} /></tr>;
    });
  };

  return (
    <div className="previouscont">
      <button onClick={goToUpcoming}>Upcoming</button>
      <div className="previouscon">
        <div className="headingprevious">
          <h1>View your Appointments</h1>
        </div>
        <div>{ListItems1()}</div>
      </div>
      <div className="previouscon">
        <div className="headingprevious">
          <h1>Test Booked</h1>
        </div>
        <table>
          {ListItems2()}
        </table>
      </div>
    </div>
  );
}

export default PrevStatus;

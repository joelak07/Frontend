import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PatientObjPrev from "./PatientObjPrev";
import TestObjPrev from "./TestObjPrev";
import "./prevStatus.css";

function PrevStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

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
      return (
        <tr className="apposrowprev">
          <PatientObjPrev key={val._id} obj={val} />
        </tr>
      );
    });
  };

  const ListItems2 = () => {
    return arr2.map((val, ind) => {
      return (
        <tr className="testrowprev">
          <TestObjPrev key={val._id} obj={val} />
        </tr>
      );
    });
  };

  return (
    <div className="previouscont">
      <div className="previouscon">
        <button className="gotoupcombutton" onClick={goToUpcoming}>
          Upcoming
        </button>
        <div className="headingprevious">
          <button>
            <h1>Appointments</h1>
          </button>
          <button>
            <h1>Tests</h1>
          </button>
        </div>
        <div className="previousconinside">
          <table className="apposprev"> {ListItems1()}</table>
        </div>
      </div>
      {/* <div className="previouscon">
        <div className="headingprevious">
          <h1>Test Booked</h1>
        </div>
        // <div>{ListItems2()}</div>
      </div> */}
    </div>
  );
}

export default PrevStatus;

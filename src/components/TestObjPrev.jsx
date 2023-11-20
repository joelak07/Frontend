import { useState } from "react";
import "./testObjPrev.css";

function TestObjPrev(props) {
  const [isShown, setIsShown] = useState(false);
  const { testName, email, testDate, slot, dob, patientName, address } =
    props.obj;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <tr className="testrowprevmain">
      <td className="dateslotprev">
        {testDate && (
          <div>
            <div
              style={{
                fontSize: "1.4rem",
                color: "#0c356a",
                fontWeight: "bold",
              }}
            >
              Date: {formatDate(testDate)}
            </div>
            {isShown && <div> {slot && <div> Slot: {slot}</div>}</div>}
          </div>
        )}
      </td>
      <td className="testnameprev">
        {testName && (
          <div>
            <div
              style={{
                fontSize: "1.4rem",
                color: "#0c356a",
                fontWeight: "bold",
              }}
            >
              Test name: {testName}
            </div>
            {isShown && (
              <div>
                {patientName && <div>Patient name: {patientName}</div>}
                {dob && <div>DOB: {formatDate(dob)}</div>}
                {email && <div>Email: {email}</div>}
              </div>
            )}
          </div>
        )}
      </td>

      <td>
        <button className="hideviewtest" onClick={() => setIsShown(!isShown)}>
          {isShown ? "Hide" : "View"}
        </button>
      </td>
    </tr>
  );
}

export default TestObjPrev;

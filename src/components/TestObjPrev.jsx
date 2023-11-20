import { useState } from "react";

function TestObjPrev(props) {
  const [isShown, setIsShown] = useState(false);
  const {
    testName,
    email,
    testDate,
    slot,
    dob,
    patientName,
    address
  } = props.obj;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <td>
        {testDate && (
          <div>
            {formatDate(testDate)}
            {isShown && (
                <div>
                    {slot && <div>{slot}</div>}
                </div>
            )}
          </div>
        )}
      </td>
      <td>
        {testName && (
          <div>
            {testName}
            {isShown && (
              <div>
                {patientName && <div>{patientName}</div>}
                {dob && <div>{formatDate(dob)}</div>}
                {address && <div>{address}</div>}
                {email && <div>{email}</div>}
              </div>
            )}
          </div>
        )}
      </td>
      <td>
        <button onClick={() => setIsShown(!isShown)}>
          {isShown ? "Hide" : "View"}
        </button>
      </td>
    </div>
  );
}

export default TestObjPrev;

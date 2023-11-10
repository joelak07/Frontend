import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifiedStatus() {
    const navigate = useNavigate();

    useEffect(() => {
        const patientValid = () => {
            let token = localStorage.getItem("patientdbtoken");
            if (token) {
                console.log("User valid");
            } else {
                console.log("invalid user");
                navigate("*");
            }
        }
        patientValid();
    }, []);

    return (
        <div>I did this at 3 am I swear to God if this doesn't work-</div>
    )
}

export default VerifiedStatus;

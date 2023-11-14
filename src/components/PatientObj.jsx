import { useEffect, useState } from "react";
import Axios from "axios";

function PatientObj(props) {
    const { _id, appointmentDate, email, patientName, slot, doctorId, reasonforappointment } = props.obj;
    const [patientDetails, setPatientDetails] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:4000/patient/getPatient", { params: { email: email, patientName: patientName } })
            .then((res) => {
                if (res.status === 200 && res.data.length > 0) {
                    setPatientDetails(res.data[0]);
                }
            })
            .catch((err) => console.error("Error fetching patient details:", err));

        Axios.get("http://localhost:4000/doctor/getDoctor", { params: { doctorId: doctorId } })
            .then((res) => {
                if (res.status === 200 && res.data.length > 0) {
                    setDoctorDetails(res.data[0]);
                }
            })
            .catch((err) => console.error("Error fetching doctor details:", err));
    }, [email, doctorId]);

    return (
        <div className="appointment-details">
            {_id && <div className="field">Appointment ID: {_id}</div>}
            {appointmentDate && <div className="field">Appointment Date: {appointmentDate}</div>}
            {slot && <div className="field">Slot: {slot}</div>}

            {patientDetails && (
                <div className="patient-details">
                    <p className="section-title"><b>Patient Details</b></p>
                    {patientDetails.patientName && <div className="field">Patient Name: {patientDetails.patientName}</div>}
                    {patientDetails.email && <div className="field">Email: {patientDetails.email}</div>}
                    {patientDetails.phoneNo && <div className="field">Phone Number: {patientDetails.phoneNo}</div>}
                    {patientDetails.address && <div className="field">Address: {patientDetails.address}</div>}
                    {patientDetails.dob && <div className="field">Date of Birth: {patientDetails.dob}</div>}
                </div>
            )}

            {doctorDetails && (
                <div className="doctor-details">
                    <p className="section-title"><b>Doctor Details</b></p>
                    {doctorDetails.doctorName && <div className="field">Doctor Name: {doctorDetails.doctorName}</div>}
                    {doctorDetails.doctorId && <div className="field">Doctor ID: {doctorDetails.doctorId}</div>}
                    {doctorDetails.specialization && <div className="field">Specialization: {doctorDetails.specialization}</div>}
                    {doctorDetails.qualification && <div className="field">Qualification: {doctorDetails.qualification}</div>}
                </div>
            )}

            {reasonforappointment && (
                <div className="additional-details">
                    <p className="section-title"><b>Additional Appointment Details</b></p>
                    <div className="field">{reasonforappointment}</div>
                </div>
            )}

            <br /><br /><br />
        </div>
    );
}

export default PatientObj;

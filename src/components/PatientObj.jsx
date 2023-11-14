

function PatientObj(props) {
    const {_id, appointmentDate ,email, slot, doctorId, reasonforappointment} = props.obj;
    return (
        <div>
            {_id}<br />
            {appointmentDate}<br />
            {slot}<br />
            {email}<br />
            {doctorId}<br />
            {reasonforappointment}<br />
            <br /><br /><br />
        </div>
    )
}

export default PatientObj;
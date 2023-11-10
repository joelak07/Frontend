import React, { Component } from "react";
import "./appointment.css";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      date: "",
      time: "",
      specialty: "",
      doctor: "",
      reason: "",
    };
  }

  handleChange = (event) => {
    if (event.target.name === "specialty") {
      // If the specialty changes, reset the selected doctor
      this.setState({
        [event.target.name]: event.target.value,
        doctor: "",
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/appointment/createAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        }
      );

      if (response.ok) {
        console.log("Appointment booked successfully!");
      } else {
        console.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const { name, email, date, time, specialty, doctor, reason } = this.state;

    const doctorOptions =
      {
        Nephrology: ["Dr Joel Abraham Koshy", "Dr Faheema Kattakath Sanil"],
        Neurology: ["Dr Shankar Jyothish", "Dr Jithu Joji"],
        Urology: ["Dr Allen Roy", "Dr Oshin Raphael"],
        Gastroentrology: ["Dr Naveed Hafeez Mohammed", "Dr Sumayya Fathima"],
      }[specialty] || [];

    return (
      <div className="appcont">
        <div className="appcon">
          <div className="heading">
            <h1>
              Book <br /> an <br /> appointment
            </h1>
          </div>
          <div className="statLog">
            <form className="appointForm" onSubmit={this.handleSubmit}>
              <div className="subdiv1">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <br />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <br />

                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <br />

                <label htmlFor="time">Time Slot:</label>
                <select
                  id="time"
                  name="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Time Slot
                  </option>
                  <option value="9:00 AM - 9:20 AM">9:00 AM - 9:20 AM</option>
                  <option value="9:20 AM - 9:40 AM">9:20 AM - 9:40 AM</option>
                  <option value="9:40 AM - 10:00 AM">9:40 AM - 10:00 AM</option>
                  <option value="10:00 AM - 10:20 AM">
                    10:00AM - 10:20 AM
                  </option>
                  <option value="10:20 AM - 10:40 AM">
                    10:20AM - 10:40 AM
                  </option>
                  <option value="10:40 AM - 11:00 AM">
                    10:20AM - 10:40 AM
                  </option>
                </select>
                <br />
                <br />
              </div>

              <div className="subdiv2">
                <label htmlFor="specialty">Specialty:</label>
                <select
                  id="specialty"
                  name="specialty"
                  value={specialty}
                  onChange={this.handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Specialty
                  </option>
                  <option value="Nephrology">Nephrology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Urology">Urology</option>
                  <option value="Gastroentrology">Gastroentrology</option>
                </select>
                <br />
                <br />

                <label htmlFor="doctor">Doctor:</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={doctor}
                  onChange={this.handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Doctor
                  </option>
                  {doctorOptions.map((doctorName) => (
                    <option key={doctorName} value={doctorName}>
                      {doctorName}
                    </option>
                  ))}
                </select>
                <br />
                <br />

                <label htmlFor="reason">Reason for Appointment:</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={this.handleChange}
                  required
                ></textarea>
                <br />
                <br />

                <button className="appointButton" type="submit">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;

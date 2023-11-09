import React, { Component } from 'react';

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send the data to a server for booking.
    console.log('Form data:', this.state);
  }

  render() {
    return (
      <div>
        <h2>Appointment</h2>
        <h3>Book an Appointment</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/><br/><br/>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} required/><br/><br/>

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChange} required/><br/><br/>

          <label htmlFor="time">Time Slot:</label>
          <select id="time" name="time" value={this.state.time} onChange={this.handleChange} required>
            <option value="9:00 AM - 9:20 AM">9:00 AM - 9:20 AM</option>
            <option value="9:20 AM - 9:40 AM">9:20 AM - 9:40 AM</option>
            <option value="9:40 AM - 10:00 AM">9:40 AM - 10:00 AM</option>
            <option value="10:00 AM - 10:20 AM">10:00AM - 10:20 AM</option>
            <option value="10:20 AM - 10:40 AM">10:20AM - 10:40 AM</option>
            <option value="10:40 AM - 11:00 AM">10:20AM - 10:40 AM</option>
            
            {/* Add more time slots as needed */}
          </select><br/><br/>

          <label htmlFor="doctor">Doctor:</label>
          <input type="text" id="doctor" name="doctor" value={this.state.doctor} onChange={this.handleChange} required/><br/><br/>

          <label htmlFor="reason">Reason for Appointment:</label>
          <textarea id="reason" name="reason" value={this.state.reason} onChange={this.handleChange} required></textarea><br/><br/>

          <button type="submit">Book Appointment</button>
        </form>
      </div>
    );
  }
}

export default Appointment;

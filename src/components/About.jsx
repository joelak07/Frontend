import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "./about.css";
import doctors1 from "../Assets/doctors1.jpg";
import doctors2 from "../Assets/doctors2.jpg";
import doctors3 from "../Assets/doctors3.jpg";
import { useState } from "react";

function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [doctors1, doctors2, doctors3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="aboutcontainer">
      <div className="aboutcon">
        <div className="aboutheader">
          <h1>Welcome to Sunrise Healthcare</h1>
          <p>Providing Care with Compassion</p>
        </div>

        <div className="aboutcontent">
          <h2>Our Story</h2>
          <p>
            At Sunrise Healthcare, we believe in delivering exceptional
            healthcare services with a focus on patient well-being. Our journey
            began decades ago when a group of dedicated medical professionals
            envisioned a healthcare facility that prioritizes compassion,
            innovation, and excellence.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to serve our community by providing high-quality,
            comprehensive healthcare services. We strive to meet the diverse
            needs of our patients and their families while maintaining the
            highest standards of medical ethics and quality care.
          </p>

          <h2>Our Values</h2>
          <ul>
            <div className="gridabout">
              <li className="gridabout1">Compassion</li>
              <li className="gridabout2">Integrity</li>
              <li className="gridabout3">Excellence</li>
              <li className="gridabout4">Teamwork</li>
              <li className="gridabout5">Innovation</li>
              <li className="gridabout6">Accountability</li>
              <li className="gridabout7">Quality</li>
              <li className="gridabout8">Trust</li>
            </div>
          </ul>

          <h2>Our Team</h2>
          <p>
            Our team of dedicated healthcare professionals who are committed to
            providing personalized care and support to every patient who walks
            through our doors. Our doctors, nurses, and staff work tirelessly to
            ensure your well-being.
          </p>
          <div className="imgcont">
            <img src={images[currentImage]} alt={`Image ${currentImage}`} />
          </div>

          <h2>Get in Touch</h2>
          <p>
            We welcome you to visit Sunrise Hospital and experience our
            state-of-the-art facilities. For inquiries, appointments, or any
            concerns, please contact us or visit our location. To schedule an
            appointment, kindly click on the button below.
          </p>
          <button type="submit" className="aboutbutton">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;

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
          <h1>About us</h1>
        </div>

        <div className="aboutcontent">
          <div className="ourstory">
            <h2>Our Story</h2>
            <p>
              At Sunrise Healthcare, our commitment to delivering exceptional
              healthcare services is rooted in a rich history that spans
              decades. Our journey began when a visionary group of dedicated
              medical professionals came together with the shared goal of
              creating a healthcare facility that goes beyond the conventional
              standards. We envisioned a place where patient well-being takes
              center stage, where compassion, innovation, and excellence form
              the cornerstone of our approach to healthcare.
              <br />
              <br />
              Our team at Sunrise Healthcare is composed of highly skilled and
              compassionate individuals who are passionate about making a
              positive impact on the lives of our patients. We believe that
              healthcare is not just about treating illnesses; it's about
              fostering a holistic sense of well-being. To achieve this, we have
              cultivated a culture of empathy and understanding, ensuring that
              every patient who walks through our doors receives personalized
              care tailored to their unique needs.
            </p>
          </div>
          <div className="ourstory">
            <h2>Our Mission</h2>
            <p>
              At Sunrise Healthcare, our mission is deeply rooted in our
              commitment to serving the community by offering high-quality,
              comprehensive healthcare services. We understand that the needs of
              our patients and their families are diverse, and it is our
              unwavering dedication to addressing these needs that sets us
              apart. Our aim is not only to meet but to exceed the expectations
              of those who entrust us with their health and well-being.
              <br />
              <br />
              Comprehensive healthcare at Sunrise means that we go beyond
              treating illnesses; we prioritize preventive care, health
              education, and holistic well-being. By taking a proactive approach
              to healthcare, we strive to empower our community with the
              knowledge and resources needed to lead healthier lives. Our
              commitment extends beyond the walls of our facilities, reaching
              into the heart of the communities we serve.
              <br />
              <br />
              Maintaining the highest standards of medical ethics is at the core
              of our practice. We believe in transparency, integrity, and open
              communication in all our interactions with patients, their
              families, and the community at large. Upholding these ethical
              principles ensures trust and fosters a strong partnership between
              our healthcare professionals and the individuals we serve.
            </p>
          </div>

          <div className="ourstory">
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
          </div>
          <div className="ourstory">
            <h2>Our Team</h2>
            <p>
              At Sunrise Healthcare, our team is comprised of a dedicated group
              of healthcare professionals who share a common commitment to
              providing exceptional and personalized care to every individual
              who entrusts us with their well-being. Our doctors, nurses, and
              support staff form a cohesive unit, working collaboratively to
              create an environment of compassion, understanding, and
              excellence. Our physicians are highly skilled and experienced,
              bringing a wealth of knowledge to the forefront of patient care.
              They are not only experts in their respective fields but also
              compassionate individuals who prioritize building strong
              doctor-patient relationships. Whether addressing complex medical
              issues or routine check-ups, our doctors are devoted to ensuring
              that each patient receives the attention and care they deserve.
              <br />
              <br />
              Together, our team embodies the values of compassion, integrity,
              excellence, teamwork, innovation, accountability, quality, and
              trust. We understand that healthcare is a collaborative effort,
              and we are here to support you at every step of your journey to
              well-being. At Sunrise Healthcare, our commitment to personalized
              care goes beyond medical expertise – it reflects our genuine
              concern for your health and our dedication to providing a
              supportive and nurturing healthcare experience.
            </p>
          </div>
          <div className="ourstoryy">
            <div className="imgcont">
              <img src={images[currentImage]} alt={`Image ${currentImage}`} />
            </div>
          </div>

          <div className="ourstory">
            <h2>Get in Touch</h2>
            <p>
              Experience cutting-edge healthcare at Sunrise Hospital. Visit our
              state-of-the-art facilities for unparalleled medical services.
              Contact us for appointments, inquiries, or any concerns. Your
              well-being is our priority. Come see us or reach out for
              exceptional care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

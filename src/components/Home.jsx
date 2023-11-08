import React, { useEffect } from "react";
import BannerImage from "../Assets/hospital.jpg";
import { Link } from "react-router-dom";
import "../components/home.css";
import "./home.css";

function Home() {
  useEffect(() => {
    function typeText(text, index) {
      if (index < text.length) {
        h1Element.textContent += text.charAt(index);
        index++;
        setTimeout(function () {
          typeText(text, index);
        }, 50);
      }
    }

    const h1Element = document.querySelector(".intro h1");


    const textToType = "Where healing and compassion come together...";


    typeText(textToType, 0);
  }, []);

  // return (
  //   // <div className="Home">
  //   //   <div
  //   //     className="headerContainer"
  //   //     style={{ backgroundImage: `url(${BannerImage})` }}
  //   //   >
  //   //     <div className="intro">
  //   //       <h1></h1>
  //   //     </div>
  //   //     <div className="desc">
  //   //       <p>
  //   //         We connect health to happiness. When the dream is to provide a slice
  //   //         of humanity with quality health care, realizing that dream becomes a
  //   //         mission.
  //   //       </p>
  //   //       <br />
  //   //       <Link to="/appointment" className="linkc">Appointment</Link>
  //   //     </div>


  //   //   </div>
  //   // </div>

    
  // );

  return (
    <div className="Home">
      <div className="headerContainer">
        <div className="background-image"></div>
        <div className="intro">
          <h1></h1>
        </div>
        <div className="desc">
          <p>
            We connect health to happiness. When the dream is to provide a slice
            of humanity with quality health care, realizing that dream becomes a
            mission.
          </p>
          <br />
          <Link to="/appointment" className="linkh">Book your Consulation Today</Link>
        </div>
      </div>
    </div>
  );
  
  
}

export default Home;

import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../components/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="contactInfo">
        <div className="contactItem">
          <PhoneIcon /> <span>123-456-7890</span>
        </div>
        <div className="contactItem">
          <MailOutlineIcon /> <span>queries@sunrisehospital.com</span>
        </div>
        <div className="contactItem">
          <LocationOnIcon /> <span>123 Main Street, Kochi, Kerala, 682301</span>
        </div>
      </div>
      <div className="socialMedia">
        <InstagramIcon />

        <TwitterIcon />

        <FacebookIcon />

        <LinkedInIcon />
      </div>
      <p>All rights reserved by &copy; {new Date().getFullYear()} sunrisehospital.com</p>
    </div>
  );
}

export default Footer;

import React from 'react';
import './Footer.css'; // Import the CSS for styling
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company-info">
          <h2>Geneus Solutions</h2>
          <p>Provides the best contents for learning in an affordable price.
          </p>
          <div className="social-icons">
            <FaInstagram className="social-icon instagram" />
            <FaWhatsapp className="social-icon whatsapp" />
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Link</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/nutri-app">Nutri App</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact us</h3>
          <ul>
            {/* <li><FaMapMarkerAlt /> Bengaluru </li> */}
            <li><FaEnvelope /> support@geneussolutions.in </li>
            <li><FaPhoneAlt /> +91 9148950239 </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Footer.css'; // Import the CSS for styling
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company-info">
          <h2>Geneus Solutions</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="social-icons">
            <FaInstagram className="social-icon instagram" />
            <FaWhatsapp className="social-icon whatsapp" />
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Link</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#nutri-app">Nutri App</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact us</h3>
          <ul>
            <li><FaMapMarkerAlt /> 123 Street, New York, USA</li>
            <li><FaEnvelope /> xyz@gmail.com</li>
            <li><FaPhoneAlt /> +1234567890</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

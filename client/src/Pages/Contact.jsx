import React, { useState, useTransition } from "react";
import img1 from "../assets/banner.jpeg";
import "./Contact.css";
import { useContactUsMutation } from "../features/contactUs/contactUsApiSlice";
import { FaFacebook, FaInstagram, FaLinkedin, FaVoicemail } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState();
  const [contactUs, { isLoading, isError, error, data }] =
    useContactUsMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const contactData = await contactUs(formData).unwrap();
        if (contactData?.ok) {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        }
        setErrorMsg("")
      } catch (error) {
        console.log("this is error", error);
        setErrorMsg(error?.data?.error);
      }
      setSubmitted(true);
    });
  };

  return (
    <div className="contact-container">
      <div className="form-full-width">
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button className="contact-send-button" type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {/* Social Connect Section */}
      <div className="connect-section">
        <h2>Let's Get in touch</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com/geneus.solutions" target="_blank" rel="noreferrer" className="icon"><FaFacebook size={30}/></a>
          <a href="https://www.instagram.com/geneus.solutions" target="_blank" rel="noreferrer" className="icon"><FaInstagram size={30}/></a>
          <a href="https://www.linkedin.com/company/geneus-solutions" target="_blank" rel="noopener noreferrer" className="icon"><FaLinkedin size={30}/></a>
          <a href="mailto:support@geneussolutions.in" className="icon"><MdEmail size={30}/></a>
        </div>
      </div>

      {submitted && (
        <div className="popup">
          {errorMsg ? (
            <>
              <h2>Not Submitted</h2>
              <p>{errorMsg}</p>
            </>
          ) : (
            <>
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully.</p>
            </>
          )}
          <button onClick={() => setSubmitted(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Contact;

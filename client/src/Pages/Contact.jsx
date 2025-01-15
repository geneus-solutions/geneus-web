import React, { useState, useTransition } from "react";
import img1 from "../assets/banner.jpeg";
import "./Contact.css";
import { useContactUsMutation } from "../features/contactUs/contactUsApiSlice";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [contactUs, { isLoading, isError, error, data }] =
    useContactUsMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      console.log(formData);
      const contactData = await contactUs(formData);
      console.log(contactData);
      if (contactData?.data?.ok) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(true);
      } else {
        setSubmitted(false);
      }
    });
  };

  return (
    <div className="contact-banner" style={{ position: "relative" }}>
      <div style={{ position: "relative", width: "100vw", height: "60vh" }}>
        <img
          src={img1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="Contact Banner"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(41, 41, 41, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white", fontSize: "3rem" }}>Contact Us</h1>
        </div>
      </div>
      <div
        className="contact-form"
        style={{ display: "flex", padding: "2rem" }}
      >
        <div
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "2rem",
            width: "35%",
            borderRadius: "8px 0 0 8px",
          }}
        >
          <h2>Let's get in touch</h2>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
              support@geneussolutions.in
            </p>
            <p>
              <i className="fa fa-phone" aria-hidden="true"></i> +91 9148950239
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "2rem",
            width: "65%",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#007BFF" }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#007BFF" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#007BFF" }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#007BFF" }}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  height: "100px",
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "0.5rem 2rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isPending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      {submitted && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully.</p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "0.5rem 2rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;

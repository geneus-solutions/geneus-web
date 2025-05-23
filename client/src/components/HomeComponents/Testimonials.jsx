import React from "react";
import "./Testimonials.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const testimonials = [
  {
    quote:
      "I don't have words to thank this man, I'm really grateful to have this channel and website in my daily routine. If you're a mere beginner, then you can trust this guy and can put your time into his content. I can assure you that it'll be worth it.",
    name: "Mohit Kumar",
    title: "Web Developer",
  },
  {
    quote:
      "For everyone who wants to level up their #Coding and #Dev skills - seriously, this channel is for you! Both basic and advanced stacks are covered on this channel, and one can learn according to their skill levels. And the icing on the cake is, most of the content is available for free.",
    name: "Rakesh Shetty",
    title: "Web Developer",
  },
];
const Testimonials = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <>
      <section className="testimonials-section">
        <h1>Testimonials</h1>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-quote">“{testimonial.quote}”</p>
              <div>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h1>Start Your Coding Journey</h1>
          <p>
            Learn coding step-by-step with India&apos;s most loved programming
            mentor.
          </p>
          <Link to={`${user ? "/courses" : "/login"}`}>
            <button className="cta-button">Start Now</button>{" "}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

import React, { useState } from "react";
import "./OurServices.css";
import Course from "../../assets/Home_Course1.png";
import Nutri from "../../assets/Home_Nutri.png";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    image: Course,
    title: "Web Development",
    link: "/courses",
    description:
      "Step into the world of web development with our dynamic, expert-guided courses! Whether you're a complete beginner or looking to take your skills to the next level, we’ve got you covered. Learn the cutting-edge technologies that power the web and gain hands-on experience creating high-performing websites and apps. Ready to turn your web development passion into a thriving career? Let’s bring your ideas to life—join our courses and start coding your future today!",
  },
  {
    id: 2,
    image: Nutri,
    link: "/nutri-app",
    title: "Nutri App",
    description:
      "Take charge of your health with the Nutri App! Effortlessly track your nutrition, set personalized health goals, and explore customized meal plans designed just for you. With real-time tracking, smart recommendations, and a user-friendly interface, living a balanced lifestyle has never been easier or more enjoyable. Start your wellness journey today and make every meal a step toward a healthier, happier you!",
  },
];

const OurServices = () => {
  return (
    <section className="our-services">
      <div className="services-header">
        <h2 className="our-services-heading">Our Services</h2>
        <p className="intro">
          At <b>Geneus Solutions</b>, we’re all about helping you level up in
          the digital age. Whether you’re ready to dive into the world of web
          development or take charge of your health with our Nutri App, we've
          got the perfect tools to get you there. Our expert-led web development
          courses equip you with the skills to build dynamic, real-world
          applications, while our Nutri App makes health management simple,
          intuitive, and personalized. With us, you're not just learning; you're
          unlocking the skills and knowledge to thrive, innovate, and feel your
          best. Let’s build your future, one course and app at a time!
        </p>
      </div>

      <div className="our-services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className='service-card'>
            <Link to={service.link} className="service-title">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <h3 className="service-title">{service.title}</h3>
            </Link>
            <p className="service-description">
              {service.description}
              {/* {expanded === service.id
                ? service.description
                : `${service.description.substring(0, 250)}...`} */}
            </p>

            <Link to={service.link}
              className="learn-more"
            >
              Explore 
              {/* {expanded === service.id ? "Read Less" : "Learn More"} */}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;

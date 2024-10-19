import React from 'react';
import "./About.css";
import AbImg from '../../assets/Ab-4.jpg'; 
import Faq from '../../assets/Ab-2.jpg'; 
import conImg from '../../assets/Ab-1.jpg'; 
import group from '../../assets/group_icon1.jpg';
import study_icon from '../../assets/study-icon.png';
import finance from '../../assets/finance.png';
import gene from '../../assets/gene.jpg';

function About() {
  return (
    <div className="row">
      <section className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-column">
            <div className="about-us-widget-wrap">
              <div className="about-us-heading">
                <div className="about-us-widget-container">
                  <h2 className="about-us-title">
                    About <span className="highlight-texts">Us</span>
                  </h2>
                </div>
              </div>
              <div className="about-us-subheading">
                <div className="about-us-widget-container">
                  <p className="about-us-description">
                    <span className="highlight-text-large">
                      Welcome to Geneus Solutions! We are an integrated technology and e-learning firm specializing in website design, development, and e-learning courses. Based in Bangalore, India, we empower individuals to become proficient developers in the ever-evolving tech landscape.
                    </span>
                  </p>
                </div>
              </div>
              <div className="about-us-info">
                <div className="about-us-widget-container">
                  <p className="about-us-details">
                    <span className="highlight-text-small">
                    At Geneus Solutions, we offer cutting-edge e-learning courses in full-stack development, with a hands-on approach that equips learners with practical skills. We also developed NutriGeneus, a web and Android app that helps users make informed dietary choices by calculating calorie intake and tracking macronutrients. <br />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="abrow">
          <div className="col-md-12 offset-right-md-6">
            <h2 className="aboutus-widget-heading-title">Our Global Reach</h2>
            <p className="aboutus-heading-title">
            At Geneus Solutions, we are a global leader in e-learning and innovative applications, specializing in full-stack development courses and health-tech solutions. We connect thousands of learners and users worldwide to the skills and tools they need to thrive in today’s technology-driven world.
            </p>
          </div>
        </section>

        <section className="row aboutus-stats">
          <div className="col-md-3 col-6">
            <div className="aboutus-card-body">
              <h2 className="highlight-text">10k+</h2>
              <p className="aboutus-text-muted">Learners</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="aboutus-card-body">
              <h2 className="highlight-text">3+</h2>
              <p className="aboutus-text-muted">Expert Instructors</p>
            </div>
          </div>
  
          <div className="col-md-3 col-6">
            <div className="aboutus-card-body">
              <h2 className="highlight-text">2</h2>
              <p className="aboutus-text-muted">Innovative Products</p>
            </div>
          </div>
        </section>

        <section className="row aboutus-values">
          <div className="col-md-4 col-12">
            <div className="aboutus-card-body">
              <img src={study_icon} alt="Innovation Icon" className="aboutus-icon" />
              <h3>Revolutionize Learning & Health</h3>
              <p>We combine cutting-edge technology with education to offer full-stack development courses and NutriGeneus, empowering learners to excel in tech and users to make informed dietary choices.</p>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="aboutus-card-body">
              <img src={group} alt="Grow Icon" className="aboutus-icon" />
              <h3>Learn, Grow, and Thrive</h3>
              <p>Our courses provide hands-on experience in technologies like ReactJS and the MERN stack, while NutriGeneus helps users achieve their nutritional goals with personalized insights.</p>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="aboutus-card-body">
              <img src={finance} alt="Innovation Icon" className="aboutus-icon" />
              <h3>Drive Innovation in Tech and Wellness</h3>
              <p>Through innovative e-learning and health-tech solutions, we drive the future of education and wellness by equipping individuals with the tools to succeed in both fields.</p>
            </div>
          </div>
        </section>

        <section className="abrow">
          <div className="col-md-12 offset-right-md-6">
            <h2 className="aboutus-widget-heading-title">Vision</h2>
            <p className="aboutus-heading-title">
            To be a global leader in providing accessible, high-quality e-learning courses in full-stack development and innovative solutions like NutriGeneus, fostering a community of skilled and health-conscious individuals.
            </p>
          </div>
        </section>
        <section className="abrow">
          <div className="col-md-12 offset-right-md-6">
            <h2 className="aboutus-widget-heading-title">Mission</h2>
            <p className="aboutus-heading-title">
            Our mission is to empower individuals worldwide by delivering exceptional e-learning experiences in full-stack development and to provide practical tools like NutriGeneus that enhance everyday decision-making. We strive to bridge the gap between aspiring developers and industry demands, fostering a culture of continuous learning, collaboration, and excellence.
            </p>
          </div>
        </section>
      </div>

      <section className="aboutus-contact pt-120 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="aboutus-contact-image">
                <img src={AbImg} alt="Contact Us" className="image" />
              </div>
              <div className="aboutus-contact-box">
              <p>Contact Us for a <span>Free Learning</span> or <span>Nutrition</span> Consulting Evaluation</p>

                <ul>
                  <li>
                    <img src={conImg} alt="Phone Icon" />
                    <a href="tel:+919148950239">+91 9148950239</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq__right">
                <div className="title-wrapper">
                  <h2 className="sec-subtitle"><img src={Faq} alt="FAQ" /> FAQ</h2>
                  <h3 className="sec-title">Frequently Asked Questions</h3>
                  <p>Architect client-centered total linkage for intuitive benefits. Dynamically restore convergence before real-time restore.</p>
                </div>
                <div className="aboutus-faq">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="heading_1">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="false" aria-controls="collapse_1">
                          1. Why choose us for your education?
                        </button>
                      </h2>
                      <div id="collapse_1" className="accordion-collapse collapse" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p>We care about safety big time — and so do your site's visitors. With a Shared Hosting account, you get an SSL certificate for free to add to your site.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="heading_2">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                          2. What do we offer to you?
                        </button>
                      </h2>
                      <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p>We provide a comprehensive range of courses, expert instructors, and a supportive learning environment to help you succeed.</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="heading_3">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                          3. How do we provide services for you?
                        </button>
                      </h2>
                      <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p>Our services are designed to be user-friendly, accessible, and tailored to meet your learning needs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="container">
        <div className="footer-widgets row pt-lg-10 pt-5 mb-6">
          <div className="footer-widget-1 mb-4 mb-0-last-child col-lg-4 col-md-6 col-12">
            <div className="widget widget_siteinfo mb-4">
              <a href="https://www.geneussolutions.in/" className="navbar-brand" rel="home">
                <img src={gene} alt="Geneus Solutions" />
              </a>
              <div className="mt-4">
                <p className="widget-site-info-desc">We are an integrated technology and e-learning firm specializing in website design, development, and e-learning courses.</p>
                <ul className="social-menu list-unstyled d-flex align-items-center fs-4 mt-4 flex-row">
                  <li><a className="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://madrasthemes.com/" aria-label="Facebook"><i className="mdi mdi-facebook"></i></a></li>
                  <li><a className="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://themeforest.net/user/madrasthemes/portfolio" aria-label="Twitter"><i className="mdi mdi-twitter"></i></a></li>
                  <li><a className="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://github.com/madrasthemes" aria-label="GitHub"><i className="mdi mdi-github"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-widget-2 mb-4 mb-0-last-child offset-lg-1 col-lg-2 col-md-3 col-6">
            <div className="widget widget_nav_menu">
              <h3 className="widget-title fw-bold mb-3">Company</h3>
              <ul className="menu">
                <li><a href="https://www.geneussolutions.in/About/">About</a></li>
               {/* <li><a href="https://www.geneussolutions.in/courses">Careers</a></li>*/}
                <li><a href="https://www.geneussolutions.in/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-widget-3 mb-4 mb-0-last-child col-lg-2 col-md-3 col-6">
            <div className="widget widget_nav_menu">
              <h3 className="widget-title fw-bold mb-3">Support</h3>
              <ul className="menu">
                <li><a href="https://www.geneussolutions.in/contact">Help and Support</a></li>
                <li><a href="https://www.geneussolutions.in/nutifit">Get the app</a></li>
                <li><a href="https://www.geneussolutions.in/courses">Tutorial</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-widget-4 mb-4 mb-0-last-child col-lg-3 col-md-12">
            <div className="widget widget_text">
              <h3 className="widget-title fw-bold mb-3">Get in Touch</h3>
              <div className="textwidget">
               
                <p className="mb-1">Email: <a href="mailto:support@geneussolutions.in">support@geneussolutions.in</a></p>
                <p>Phone: <span className="text-dark fw-semi-bold">+91 9148950239</span></p>
              </div>
            </div>
          </div>
        </div> 
      </footer>
    </div>
  );
}

export default About;
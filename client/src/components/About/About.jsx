import React from 'react';
import  "./About.css";
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
                    Welcome to Geneus Solutions, We are an integrated Technology and E-learning Firm specialized in 
                    providing Website design and development and E-learning courses. We are your premier destination 
                    for cutting-edge E-learning courses in full-stack development. Based in Bangalore, India, we are 
                    passionate about empowering individuals to become proficient and versatile developers in the 
                    ever-evolving field of technology.
                  </span>
                </p>
              </div>
            </div>

            <div className="about-us-info">
              <div className="about-us-widget-container">
                <p className="about-us-details">
                  <span className="highlight-text-small">
                    At Geneus Solutions, we offer comprehensive courses covering ReactJS, HTML/CSS/JavaScript, Java, Angular, 
                    and the complete MERN stack. Our dynamic and hands-on approach ensures that students not only grasp the 
                    theoretical foundations but also gain practical skills that are essential in the real-world scenario.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


<div class="container">
  <section class="abrow">
    <div class="col-md-6 offset-right-md-6">
      <h2 class="aboutus-widget-heading-title">Our Global Reach</h2>
      <p class="aboutus-heading-title">Geeks is a leading global marketplace for teaching and learning, connecting millions of students to the skills they need to succeed.</p>
    </div>
  </section>

  <section class="row aboutus-stats">
    <div class="col-md-3 col-6">

      <div class="aboutus-card-body">
        <h2 class="highlight-text">2k</h2>
        <p class="aboutus-text-muted">Learners</p>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="aboutus-card-body">
        <h2 class="highlight-text">5K</h2>
        <p class="aboutus-text-muted">Instructors</p>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="aboutus-card-body">
        <h2 class="highlight-text">7k</h2>
        <p class="aboutus-text-muted">Courses</p>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="aboutus-card-body">
        <h2 class="highlight-text">380k</h2>
        <p class="aboutus-text-muted">Course Enrollments</p>
      </div>
    </div>
  </section>

  <section className="row aboutus-values">
      <div className="col-md-4 col-12">
        <div className="aboutus-card-body">
        <img src={study_icon} alt="Innovation Icon" className="aboutus-icon" />
        <h3>Make Education Accessible</h3>
          <p>Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id blanvolutpat nunc.</p>
        </div>
      </div>

      <div className="col-md-4 col-12">
        <div className="aboutus-card-body">
          <img src={group} alt="Grow Icon" className="aboutus-icon" />
          <h3>Learn and Grow</h3>
          <p>Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id blanvolutpat nunc.</p>
        </div>
      </div>

      <div className="col-md-4 col-12">
        <div className="aboutus-card-body">
          <img src={finance} alt="Innovation Icon" className="aboutus-icon" />
          <h3>Drive Innovation</h3>
          <p>Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id blanvolutpat nunc.</p>
        </div>
      </div>
    </section>
   </div>

 <section class="aboutus-contact pt-120 pb-150">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="aboutus-contact-image">
            <img src={AbImg} alt="Image" className="image" />
          </div>
          <div class="aboutus-contact-box">
            <p>Contact Us For a <span>Free Learning</span> Consulting Evaluation</p>
            <ul>
              <li>
              <img src={conImg} alt="Icon" />
                <a href="tel:+91 9148950239">+91 9148950239</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="faq__right">
            <div class="title-wrapper">
              <h2 class="sec-subtitle"><img src={Faq} alt="Dot" /> FAQ</h2>
              <h3 class="sec-title">Frequently Asked Questions</h3>
              <p>Architect client-centered total linkage for intuitive benefits. Dynamically restore convergence before real-time restore.</p>
            </div>

           
            <div class="aboutus-faq">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading_1">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="false" aria-controls="collapse_1">
                      1. Why choose us for your education?
                    </button>
                  </h2>
                  <div id="collapse_1" class="accordion-collapse collapse" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p>We care about safety big time — and so do your site's visitors. With a Shared Hosting account, you get an SSL certificate for free to add to your site.</p>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading_2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                      2. Why choose us for your education?
                    </button>
                  </h2>
                  <div id="collapse_2" class="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p>We care about safety big time — and so do your site's visitors. With a Shared Hosting account, you get an SSL certificate for free to add to your site.</p>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading_3">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                      3. What We Offer To You?
                    </button>
                  </h2>
                  <div id="collapse_3" class="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p>We care about safety big time — and so do your site's visitors. With a Shared Hosting account, you get an SSL certificate for free to add to your site.</p>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading_4">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                      How We Provide Services For You?
                    </button>
                  </h2>
                  <div id="collapse_4" class="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p>We care about safety big time — and so do your site's visitors. With a Shared Hosting account, you get an SSL certificate for free to add to your site.</p>
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

<footer class="container">
  <div class="footer-widgets row pt-lg-10 pt-5 mb-6">
    <div class="footer-widget-1 mb-4 mb-0-last-child col-lg-4 col-md-6 col-12">
      <div class="widget widget_siteinfo mb-4">
        <a href="https://www.geneussolutions.in/" class="navbar-brand" rel="home">        
          <img src={gene} alt="Icon" />
            </a>
        <div class="mt-4">
          <p class="widget-site-info-desc">We are integrated Technology and Elearning Firm specialized in providing Website design and development and Elearning courses.</p>
          <ul class="social-menu list-unstyled d-flex align-items-center fs-4 mt-4 flex-row">
            <li><a class="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://madrasthemes.com/" aria-label="Facebook"><i class="mdi mdi-facebook"></i></a></li>
            <li><a class="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://themeforest.net/user/madrasthemes/portfolio" aria-label="Twitter"><i class="mdi mdi-twitter"></i></a></li>
            <li><a class="text-muted me-2 p-0 fs-4 lh-1 pe-1" href="https://github.com/madrasthemes" aria-label="GitHub"><i class="mdi mdi-github"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

  
    <div class="footer-widget-2 mb-4 mb-0-last-child offset-lg-1 col-lg-2 col-md-3 col-6">
      <div class="widget widget_nav_menu">
        <h3 class="widget-title fw-bold mb-3">Company</h3>
        <ul class="menu">
          <li><a href="https://www.geneussolutions.in/About/">About</a></li>
          <li><a href="https://www.geneussolutions.in/courses">Careers</a></li>
          <li><a href="https://geeks.madrasthemes.com/contact/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-widget-3 mb-4 mb-0-last-child col-lg-2 col-md-3 col-6">
      <div class="widget widget_nav_menu">
        <h3 class="widget-title fw-bold mb-3">Support</h3>
        <ul class="menu">
          <li><a href="https://geeks.madrasthemes.com/about/">Help and Support</a></li>
          <li><a href="https://www.geneussolutions.in/nutifit">Get the app</a></li>
          <li><a href="https://www.geneussolutions.in/courses">Tutorial</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-widget-4 mb-4 mb-0-last-child col-lg-3 col-md-12">
      <div class="widget widget_text">
        <h3 class="widget-title fw-bold mb-3">Get in touch</h3>
        <div class="textwidget">
          <p>BENGALURU, Karnataka</p>
          <p class="mb-1">Email: <a href="mailto:support@geneussolutions.in">support@geneussolutions.in</a></p>
          <p>Phone: <span class="text-dark fw-semi-bold"> 9148950239</span></p>
        </div>
      </div>
    </div>
  </div> 
</footer>

</div>
  );
}

export default About;

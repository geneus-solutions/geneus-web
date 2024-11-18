import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';
import gene from '../../assets/gene.jpg'
const Footer = () => {
  return (
    <footer className="container">
        <div className="footer-widgets row pt-lg-10 pt-5 mb-6">
          <div className="footer-widget-1 mb-4 mb-0-last-child col-lg-4 col-md-6 col-12">
            <div className="widget widget_siteinfo mb-4">
              <a href="https://www.geneussolutions.in/" className="navbar-brand" rel="home">
                <img src={gene} alt="Geneus Solutions" />
              </a>
              <div className="mt-4">
                <p className="widget-site-info-desc">We are integrated Technology and Elearning Firm specialized in providing Website design and Elearning courses and Nutritional App.</p>
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
  )
}

export default Footer;

import React from "react";
// import img1 from "../assets/banner.jpeg";
// import nutriImage from '../assets/nutriImage.jpg';
// import courseImage from '../assets/courses.jpg';
// import img2 from "../assets/why choose us.png";
import "./About.css";
import AboutUs from "../components/HomeComponents/AboutUs";
// import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
import { FaBalanceScale, FaBullseye, FaEye } from "react-icons/fa";
import CircleCard from "../components/About/CircleCard";
import AboutUsFirst from "../components/About/AboutUsFirst";
import OurServices from "./OurServices2";
import WhyChooseUs from "../components/HomeComponents/WhyChooseUs";
import Testimonials from "../components/HomeComponents/Testimonials";
const About = () => {
  const cards = [
    {
      icon: <FaBullseye />,
      title: "Mission",
      description:
        " Our mission is to empower individuals worldwide by delivering exceptional E-learning experiences in full-stack development. We strive to bridge the gap between aspiring developers and industry demands, fostering a culture of continuous learning, collaboration, and excellence.",
      gradient: "linear-gradient(to right, #ff00ff, #ff80ff)",
    },
    {
      icon: <FaBalanceScale />,
      title: "Value",
      description:
        "We value integrity, innovation, and inclusivity. Our commitment is to deliver high-quality, accessible E-learning experiences that empower learners to build confidence and competence in full-stack development. We prioritize collaboration, adaptability, and a growth mindset to meet evolving industry needs.",
      gradient: "linear-gradient(to right, #00ff00, #80ff80)",
    },

    {
      icon: <FaEye />,
      title: "Vision",
      description:
        "To be a global leader in providing accessible and high-quality E-learning courses in full-stack development fostering a community of skilled and innovative developers.",
      gradient: "linear-gradient(to right, #ff8000, #ffb380)",
    },
  ];

  // const ServiceCard = styled(Box)(({ theme }) => ({
  //   position: "relative",
  //   width: "300px",
  //   height: "250px",
  //   overflow: "hidden",
  //   borderRadius: theme.shape.borderRadius,
  //   cursor: "pointer",
  //   "&:hover .overlay": {
  //     opacity: 1,
  //   },
  //   "&:hover img": {
  //     transform: "scale(1.1)",
  //   },
  // }));

  // const ServiceImage = styled("img")({
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "cover",
  //   transition: "transform 0.3s ease-in-out",
  // });

  // const Overlay = styled(Box)({
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0,0 , 0.85)",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   opacity: 0,
  //   transition: "opacity 0.3s ease-in-out",
  //   className: "overlay",
  // });

  // const ServicesContainer = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   gap: theme.spacing(4),
  //   marginTop: theme.spacing(4),
  //   justifyContent: "center", // Center the service cards
  //   [theme.breakpoints.down("md")]: {
  //     flexDirection: "column",
  //     alignItems: "center",
  //   },
  // }));

  return (
    <>
    {/* <Testimonials/> */}
    <div >
    <AboutUsFirst/>
    
    <AboutUs />
    <OurServices/>
    <WhyChooseUs/>
      {/* <div style={{ position: "relative", width: "100vw", height: "60vh" }}>
        <img
          src={img1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="about Banner"
        />
        
        <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(124, 166, 255, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          }}
          >
          <h1 style={{ color: "white", fontSize: "3rem" }}>About</h1>
          </div>
          </div> */}
      {/* <div className="what-we-do">
        <Box sx={{ py: 6, px: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
                >
                <Box
                  sx={{
                    width: "150px",
                    height: "5px",
                    backgroundColor: "#00b0ff",
                    marginRight: "10px",
                    marginBottom: "5px",
                  }}
                  />
                <Box
                  sx={{
                    width: "100px",
                    height: "5px",
                    backgroundColor: "#00b0ff",
                    marginRight: "10px",
                  }}
                  />
              </Box>

              <Typography variant="h4" sx={{ mx: 2, fontWeight: "bold" }}>
                What we do
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                >
                <Box
                  sx={{
                    width: "150px",
                    height: "5px",
                    backgroundColor: "#00b0ff",
                    marginRight: "10px",
                    marginBottom: "5px",
                  }}
                  />
                <Box
                  sx={{
                    width: "100px",
                    height: "5px",
                    backgroundColor: "#00b0ff",
                    marginRight: "10px",
                  }}
                  />
              </Box>
            </Box>
          </Box>

          <ServicesContainer>
            <ServiceCard>
              <ServiceImage src={courseImage} alt="Nutrition App" />
              <Overlay className="overlay">
                <Typography
                  variant="h5"
                  color="white"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    px: 2,
                  }}
                  >
                  Course
                  <br />
                  <p style={{ fontSize: "15px" }}>
                  We provide a comprehensive range of courses, expert instructors, and a supportive learning environment to help you succeed.
                  </p>
                </Typography>
              </Overlay>
            </ServiceCard>

            <ServiceCard>
              <ServiceImage src={nutriImage} alt="Community" />
              <Overlay className="overlay">
                <Typography
                  variant="h5"
                  color="white"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    px: 2,
                  }}
                  >
                  Nutrition App
                  <p style={{ fontSize: "15px" }}>
                  Helps users make informed dietary choices by calculating calorie intake and tracking macronutrients.
                  </p>
                </Typography>
              </Overlay>
            </ServiceCard>
          </ServicesContainer>
        </Box>
      </div> */}


      {/* <div className="why-choose-us">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
              >
              <Box
                sx={{
                  width: "150px",
                  height: "5px",
                  backgroundColor: "#00b0ff",
                  marginRight: "10px",
                  marginBottom: "5px",
                }}
                />
              <Box
                sx={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "#00b0ff",
                  marginRight: "10px",
                }}
                />
            </Box>

            <Typography variant="h4" sx={{ mx: 2, fontWeight: "bold" }}>
              Why choose us
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              >
              <Box
                sx={{
                  width: "150px",
                  height: "5px",
                  backgroundColor: "#00b0ff",
                  marginRight: "10px",
                  marginBottom: "5px",
                }}
                />
              <Box
                sx={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "#00b0ff",
                  marginRight: "10px",
                }}
                />
            </Box>
          </Box>
        </Box>

        <div className="circle-container">
          <div className="center-circle">
            <img src={img2} alt="profile" />
          </div>

          <div className="feature-card top">
            <div className="icon-circle green">
              <SettingsIcon style={{ color: "white" }} />
            </div>
            <Typography
              variant="h6"
              style={{ color: "#00E676", marginTop: "10px" }}
              >
              Comprehensive Curriculum
            </Typography>
            <Typography variant="body2" style={{ marginTop: "5px" }}>
              Our courses are carefully crafted to provide a comprehensive
              understanding of each technology, ensuring you cover all the
              essential concepts and advanced techniques.
            </Typography>
          </div>

          <div className="feature-card right">
            <div className="icon-circle blue">
              <SettingsIcon style={{ color: "white" }} />
            </div>
            <Typography
              variant="h6"
              style={{ color: "#00b0ff", marginTop: "10px" }}
              >
              Hands-on Projects
            </Typography>
            <Typography variant="body2" style={{ marginTop: "5px" }}>
              Put your skills into practice with real-world projects that
              simulate industry scenarios. Gain practical experience and build a
              portfolio that showcases your abilities.
            </Typography>
          </div>

          <div className="feature-card bottom">
            <div className="icon-circle purple">
              <SettingsIcon style={{ color: "white" }} />
            </div>
            <Typography
              variant="h6"
              style={{ color: "#E040FB", marginTop: "10px" }}
              >
              Expert Instructors
            </Typography>
            <Typography variant="body2" style={{ marginTop: "5px" }}>
              Learn from experienced instructors who are passionate about full
              stack development and dedicated to helping you succeed. Benefit
              from their insights, industry knowledge, and best practices.
            </Typography>
          </div>

          <div className="feature-card left">
            <div className="icon-circle red">
              <SettingsIcon style={{ color: "white" }} />
            </div>
            <Typography
              variant="h6"
              style={{ color: "#FF5252", marginTop: "10px" }}
              >
              Interactive Learning
            </Typography>
            <Typography variant="body2" style={{ marginTop: "5px" }}>
              Engage in interactive learning experiences, including coding
              exercises, quizzes, and discussions. Collaborate with fellow
              learners, exchange ideas, and get valuable feedback.
            </Typography>
          </div>
        </div>
      </div> */}
      <Testimonials/>

      <div className="mission-vision-value">
        <Box sx={{ py: 6, px: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
            }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              >
              <Typography variant="h4" sx={{ mx: 2, fontWeight: "bold" }}>
                Our Core Values
              </Typography>
            </Box>
          </Box>

          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
            {cards.map((card, index) => (
              <CircleCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              gradient={card.gradient}
              />
            ))}
          </div>

         
        </Box>
      </div>
    </div>
      </>
  );
}

export default About;

import React from "react";
import Slider from "react-slick";
import Tooltip from "@mui/material/Tooltip";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const profiles = [
  {
    name: "Dipendra",
    program: "Completed Full Stack Program",
    designation: "Junior Software Engineer",
    company: "Protiviti",
    image:"https://media.licdn.com/dms/image/v2/C4D03AQHnMeYZLVTbpA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650721763105?e=1768435200&v=beta&t=9gaAL8GN6nbJL4hbuTrZ4icrBWV1FPvxG-r8rqAo4T0",
    linkedin: "https://www.linkedin.com/in/dipendra-kumar-bm5/",
  },
  {
    name: "Deepak",
    program: "Completed Full Stack Program",
    designation: "Full-stack Developer",
    company: "Tigris Mobility Pvt Ltd",
    image:"https://media.licdn.com/dms/image/v2/D5603AQF6MPEJ4I8mJw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714464098361?e=1768435200&v=beta&t=3iNorjzP3KRo5sp14YgVz6ywQPQCCfVTINdRaR7rzog",
    linkedin: "https://www.linkedin.com/in/deepakgupta21/",
  },
  {
    name: "Sonali",
    program: "Completed Full Stack Program",
    designation: "Full Stack Developer",
    company: "TechStack",
    image:"https://media.licdn.com/dms/image/v2/D5603AQH-CbD1QSiiTw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714917159590?e=1768435200&v=beta&t=xvx7-SRun2QOh8g1jbdkl2LsWO3qIpKCKiEWr8snaQQ",
    linkedin: "https://www.linkedin.com/in/sonali-kumari-114a03204/",
  },
];


const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: "absolute", left: -40, top: "45%", zIndex: 1 }}>
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: "absolute", right: -40, top: "45%", zIndex: 1 }}>
    <ArrowForwardIos />
  </IconButton>
);

const SocialProofCarousel = () => {
  const settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "white" }}>
      <Typography variant="h4" align="center" fontWeight="bold" mb={5}>
        Our Learners Now Work In the Industry
      </Typography>

      <Box sx={{ maxWidth: "1600px", mx: "auto", px: 2 }}>
        <Slider {...settings}>
          {profiles.map((profile, index) => (
            <Box key={index} px={2}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <Avatar src={profile.image} sx={{ width: 80, height: 80 }} />
                    <Typography fontWeight="bold">{profile.name}</Typography>
                     <Typography fontWeight="bold">{profile.program}</Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                      {profile.designation}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">{profile.company}</Typography>
                    <Tooltip title="View Linkedin profile" placement="top" arrow>
                    <IconButton
                      component="a"
                      href={profile.linkedin}
                      target="_blank"
                      color="primary"
                    >
                      <LinkedInIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default SocialProofCarousel;

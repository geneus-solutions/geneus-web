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
import dipendraImg from "../../assets/Dipendra.jpg"
import deepakImg from "../../assets/Deepak.jpg"
import sonaliImg from "../../assets/Sonali.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const profiles = [
  {
    name: "Dipendra",
    program: "Completed Full Stack Program",
    designation: "Junior Software Engineer",
    company: "Protiviti",
    image:dipendraImg,
    linkedin: "https://www.linkedin.com/in/dipendra-kumar-bm5/",
  },
  {
    name: "Deepak",
    program: "Completed Full Stack Program",
    designation: "Full-stack Developer",
    company: "Tigris Mobility Pvt Ltd",
    image:deepakImg,
    linkedin: "https://www.linkedin.com/in/deepakgupta21/",
  },
  {
    name: "Sonali",
    program: "Completed Full Stack Program",
    designation: "Full Stack Developer",
    company: "TechStack",
    image:sonaliImg,
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

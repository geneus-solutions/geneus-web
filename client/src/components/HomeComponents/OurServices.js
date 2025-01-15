import React from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import img1 from "../../assets/courses.jpg";
import img2 from "../../assets/nutriImage.jpg";

// Styled components
const ServiceCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "300px",
  height: "250px",
  overflow: "hidden",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
  "&:hover img": {
    transform: "scale(1.1)",
  },
}));

const ServiceImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0,0 , 0.85)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  className: "overlay",
});

const ServicesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  justifyContent: "center", // Center the service cards
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

function OurServices() {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 8, px: 4 }}>
      {/* Title Section */}
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
            Our Services
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

      {/* Services Cards */}
      <ServicesContainer>
        {/* Nutrition App Card */}
        <ServiceCard>
          <ServiceImage src={img1} alt="Nutrition App" />
          <Overlay className="overlay" onClick={()=>navigate('/courses')}>
            <Typography
              variant="h5"
              color="white"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                px: 2,
              }}
              
            >
              Courses
            </Typography>
          </Overlay>
        </ServiceCard>

        {/* Community Card */}
        <ServiceCard>
          <ServiceImage src={img2} alt="Community" />
          <Overlay className="overlay"onClick={()=>navigate('/nutri-app')}>
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
            </Typography>
          </Overlay>
        </ServiceCard>
      </ServicesContainer>
    </Box>
  );
}

export default OurServices;

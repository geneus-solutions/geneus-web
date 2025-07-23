import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Typography, Button, Grid, Avatar, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import startImage from '../../assets/startImage.png'

const StartToday = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "#C0E665", // Match the light green background
        px: { xs: 4, md: 10 },
        display: "flex",
        minHeight: "400px",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Section - Text and CTA */}
      <Box sx={{ display:'flex',flexDirection:'column',justifyContent:'center', textAlign: { xs: "center", md: "left" } }}>
        <Typography variant="h3" fontWeight="bold">
          Start Your Fitness <br /> Journey Today
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/calculate-calorie")}
          sx={{
            backgroundColor: "#007BFF", // Use primary blue
            color: "#fff",
            borderRadius: "20px",
            mt: 3,
            px: 4,
            py: 1,
            "&:hover": { backgroundColor: "#0056b3" }, // Darker shade on hover
          }}
        >
          Get Started
        </Button>

        {/* Rating & Users */}
        <Stack direction="row" alignItems="center" spacing={1} mt={3}>
          <StarIcon sx={{ color: "#FFC107" }} />
          <Typography variant="body1" fontWeight="bold">
            4.9
          </Typography>
          <Box sx={{ display: "flex" }}>
            {/* Replace with actual avatars */}
            {[
                'https://mui.com/static/images/avatar/1.jpg', 
                'https://mui.com/static/images/avatar/2.jpg', 
                'https://mui.com/static/images/avatar/3.jpg'
            ].map((imgUrl,index) => (
              <Avatar
                key={index}
                src={imgUrl} // Replace with real images
                sx={{
                  width: 32,
                  height: 32,
                  ml: index !== 1 ? -1 : 0, // Overlapping effect
                }}
              />
            ))}
          </Box>
          <Typography variant="body1" sx={{ ml: 1,fontWeight:'bold' }}>
            100K+ users
          </Typography>
        </Stack>
      </Box>

      {/* Right Section - Mobile Screenshots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Grid container spacing={2} sx={{ position:'static',bottom:0,maxWidth: 400 }}>
          <Grid item xs={6}>
            <img
              src={startImage}
              alt="App Screenshot"
              style={{
                position: "relative",
                width: "430px",
                height: "350px",
                top:'50px'
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StartToday;

import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { FitnessCenter, Timeline, Group, BarChart } from "@mui/icons-material";

const features = [
  {
    title: "Track Your Progress",
    description: "Real-time monitoring of your workouts, calories burned, and more.",
    icon: <Timeline fontSize="large" />,
  },
  {
    title: "Personalized Workouts",
    description: "Tailored workout plans designed to match your personality.",
    icon: <FitnessCenter fontSize="large" />,
  },
  {
    title: "Performance Analysis",
    description: "In-depth analysis of your fitness performance metrics.",
    icon: <BarChart fontSize="large" />,
  },
  {
    title: "Community Support",
    description: "Connect, share achievements, and stay motivated together!",
    icon: <Group fontSize="large" />,
  },
];

const FeatureSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Left Section */}
      <Box sx={{ 
        flex: 1,
        px: 6,
        py: 8,
      }}>
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: "#E6F4EA",
            px: 1,
            py: 0.5,
            borderRadius: "4px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          OUR FEATURES
        </Typography>
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Track your progress, crush your goals, <br /> and reach a fitter you!
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
          Key features that propel your fitness journey.
        </Typography>

        <Grid container spacing={2} mt={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "150px",
                  gap: 2,
                  p: 2,
                  backgroundColor:'#f8f9fd',
                  borderRadius: "12px",
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                }}
              >
                {feature.icon}
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Right Section - Image and Stats */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="data:image/jpeg;base64,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"
          alt="Fitness"
          style={{
            width: "100%",
            maxHeight: "700px",
            // borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        
      </Box>
    </Box>
  );
};

export default FeatureSection;

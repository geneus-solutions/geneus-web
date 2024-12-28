import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForward from '@mui/icons-material/ArrowForward';
import img1 from "../../assets/banner2.jpeg"
// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(8),
  padding: theme.spacing(6),
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(4),
  }
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '500px'
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  '& video': {
    width: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
  }
}));



const MoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00b0ff',
  color: 'white',
  padding: '12px 24px',
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#0081cb',
  }
}));

const AboutUs = () => {
  return (
    <SectionContainer>
      <ContentContainer>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <h1 style={{ marginRight: '10px' }}>About Us</h1>
  <div className="line" style={{ display: 'flex',flexDirection : 'column',  }}>
    <div
      className="line1"
      style={{
        width: '150px',
        height: '5px', // Height to define the line thickness
        backgroundColor: '#00b0ff',
        marginRight: '10px', // Space between the first and second lines
        marginBottom: '5px', // Space between the first and second lines
      }}
    ></div>
    <div
      className="line1"
      style={{
        width: '100px',
        height: '5px', // Height to define the line thickness
        backgroundColor: '#00b0ff',
        marginRight: '10px',  // Second line color
      }}
    ></div>
  </div>
</div>
        
        <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.7 }}>
        Welcome to Geneus Solutions, your premier destination for cutting-edge E-learning courses in full-stack development. Based in Bangalore, India , we are passionate about empowering individuals to become proficient and versatile developers in the ever-evolving field of technology.

At Geneus Solutions, we offer comprehensive courses covering Java, Angular, ReactJS, HTML/CSS/Javascript and the complete MERN stack. Our dynamic and hands-on approach ensures that students not only grasp the theoretical foundations but also gain practical skills that are essential in the real-world scenario.
        </Typography>

        <MoreButton
          variant="contained"
          endIcon={<ArrowForward />}
        >
          More
        </MoreButton>
      </ContentContainer>

      <VideoContainer>
        <video
          controls
          poster={img1}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoContainer>
    </SectionContainer>
  );
};

export default AboutUs;
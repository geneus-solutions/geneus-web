import React from 'react'
import img1 from '../../assets/banner.jpeg'
import img2 from '../../assets/Fitness.jpeg'
import './About.css'
import AboutUs from '../HomeComponents/AboutUs'
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
function About() {
  const ServiceCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '300px',
    height: '250px',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '&:hover .overlay': {
      opacity: 1,
    },
    '&:hover img': {
      transform: 'scale(1.1)',
    }
  }));
  
  const ServiceImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  });
  
  const Overlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0,0 , 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    className: 'overlay',
  });
  
  const ServicesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(4),
    marginTop: theme.spacing(4),
    justifyContent: 'center',  // Center the service cards
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));
  return (
    <div style = {{position : "relative"}}>
<div style={{ position: 'relative', width: '100vw', height: '60vh' }}>
     <img
       src={img1}
       style={{
         width: '100%',
         height: '100%',
         objectFit: 'cover',
       }}
       alt="about Banner"
     />
   
     <div
       style={{
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         backgroundColor: 'rgba(124, 166, 255, 0.5)',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
       }}
     >
       <h1 style={{ color: 'white', fontSize: '3rem' }}>About</h1>
     </div>
   </div>
<AboutUs/>
<div className='what-we-do'>
<Box sx={{ py: 6, px: 4 }}>
      {/* Title Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center' 
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end'
          }}>
            <Box sx={{
              width: '150px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
              marginBottom: '5px',
            }} />
            <Box sx={{
              width: '100px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
            }} />
          </Box>
          
          <Typography variant="h4" sx={{ mx: 2, fontWeight: 'bold' }}>
          What we do
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{
              width: '150px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
              marginBottom: '5px',
            }} />
            <Box sx={{
              width: '100px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
            }} />
          </Box>
        </Box>
      </Box>

      {/* Services Cards */}
      <ServicesContainer>
        {/* Nutrition App Card */}
        <ServiceCard>
          <ServiceImage
            src={img1}
            alt="Nutrition App"
          />
          <Overlay className="overlay">
            <Typography 
              variant="h5" 
              color="white"
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center',
                px: 2
              }}
            >
         Course<br/>
        <p style={{fontSize : '15px'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </p> 
            </Typography>
          </Overlay>
        </ServiceCard>

        {/* Community Card */}
        <ServiceCard>
          <ServiceImage
            src={img2}
            alt="Community"
          />
          <Overlay className="overlay">
            <Typography 
              variant="h5" 
              color="white"
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center',
                px: 2
              }}
            >
             Nutrition App
             <p style={{fontSize : '15px'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </p> 
            </Typography>
          </Overlay>
        </ServiceCard>
      </ServicesContainer>
    </Box>
</div>

<div className='why-choose-us'>
<Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center' 
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end'
          }}>
            <Box sx={{
              width: '150px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
              marginBottom: '5px',
            }} />
            <Box sx={{
              width: '100px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
            }} />
          </Box>
          
          <Typography variant="h4" sx={{ mx: 2, fontWeight: 'bold' }}>
          Why choose us
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{
              width: '150px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
              marginBottom: '5px',
            }} />
            <Box sx={{
              width: '100px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
            }} />
          </Box>
        </Box>
      </Box>

      <div className='circle-container'>
          <div className='center-circle'>
            <img src={img2} alt="profile" />
          </div>

          <div className='feature-card top'>
            <div className='icon-circle green'>
              <SettingsIcon style={{ color: 'white' }} />
            </div>
            <Typography variant="h6" style={{ color: '#00E676', marginTop: '10px' }}>
              Lorem ipsum dolor
            </Typography>
            <Typography variant="body2" style={{ marginTop: '5px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
          </div>

          <div className='feature-card right'>
            <div className='icon-circle blue'>
              <SettingsIcon style={{ color: 'white' }} />
            </div>
            <Typography variant="h6" style={{ color: '#00b0ff', marginTop: '10px' }}>
              Lorem ipsum dolor
            </Typography>
            <Typography variant="body2" style={{ marginTop: '5px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
          </div>

          <div className='feature-card bottom'>
            <div className='icon-circle purple'>
              <SettingsIcon style={{ color: 'white' }} />
            </div>
            <Typography variant="h6" style={{ color: '#E040FB', marginTop: '10px' }}>
              Lorem ipsum dolor
            </Typography>
            <Typography variant="body2" style={{ marginTop: '5px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
          </div>

          <div className='feature-card left'>
            <div className='icon-circle red'>
              <SettingsIcon style={{ color: 'white' }} />
            </div>
            <Typography variant="h6" style={{ color: '#FF5252', marginTop: '10px' }}>
              Lorem ipsum dolor
            </Typography>
            <Typography variant="body2" style={{ marginTop: '5px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
          </div>
        </div>
</div>

<div className='mission-vision-value'>
<Box sx={{ py: 6, px: 4 }}>
  {/* Title Section - Reusing your existing style */}
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    mb: 6
  }}>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center' 
    }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}>
        <Box sx={{
          width: '150px',
          height: '5px',
          backgroundColor: '#00b0ff',
          marginRight: '10px',
          marginBottom: '5px',
        }} />
        <Box sx={{
          width: '100px',
          height: '5px',
          backgroundColor: '#00b0ff',
          marginRight: '10px',
        }} />
      </Box>
      
      <Typography variant="h4" sx={{ mx: 2, fontWeight: 'bold' }}>
        Our Core Values
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          width: '150px',
          height: '5px',
          backgroundColor: '#00b0ff',
          marginRight: '10px',
          marginBottom: '5px',
        }} />
        <Box sx={{
          width: '100px',
          height: '5px',
          backgroundColor: '#00b0ff',
          marginRight: '10px',
        }} />
      </Box>
    </Box>
  </Box>

  <div className="mvv-container">
    <div className="mvv-card mission">
      <div className="mvv-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      </div>
      <h3>Mission</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
    </div>

    <div className="mvv-card value">
      <div className="mvv-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 12h4v8h16v-8h4L12 2z"/>
        </svg>
      </div>
      <h3>Value</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
    </div>

    <div className="mvv-card vision">
      <div className="mvv-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <h3>Vision</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
    </div>
  </div>
</Box>

</div>
    </div>
  )
}

export default About
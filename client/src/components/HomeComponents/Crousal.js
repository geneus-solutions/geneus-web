import React, { useState } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import img1 from "../../assets/banner.jpeg"

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
}));

const SlideContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: 'transform 0.5s ease-in-out',
}));

const NavButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)', // Vertically center the button
    color: '#fff',
    width: '50px',  // Set width to make it square
    height: '50px', // Set height to make it square
    borderWidth: '2px',
    borderColor: 'white',
    borderStyle: 'solid', // Ensure the border is solid and visible
    borderRadius: '8px',  // Optional: Add rounded corners for a softer look
    display: 'flex',  // Center icon inside the button
    justifyContent: 'center', // Align icon horizontally
    alignItems: 'center',  // Align icon vertically
  
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',  // Hover effect
    },
  }));

const Gradient = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
   backgroundColor: 'rgba(124, 166, 255, 0.68)',
});

const carouselData = [
  {
    title: "Get educated online from your home",
    subtitle: "Best Online Course",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image: img1
  },
  {
    title: "Learn at your own pace",
    subtitle: "Flexible Learning",
    description: "Discover thousands of courses from expert instructors worldwide",
    image: img1
  },
  {
    title: "Advance your career",
    subtitle: "Professional Development",
    description: "Gain new skills and certifications to boost your career prospects",
    image: img1
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  return (
    <CarouselContainer>
      {carouselData.map((slide, index) => (
        <SlideContainer
          key={index}
          sx={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <Box
            component="img"
            src={slide.image}
            alt={slide.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Gradient />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: 6,
              color: 'white',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.light', mb: 1, fontSize: '1.25rem' }}
            >
              {slide.subtitle}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                maxWidth: '800px',
                fontSize: { xs: '2.5rem', md: '3.75rem' },
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: '600px', mb: 4, fontSize: '1.1rem' }}
            >
              {slide.description}
            </Typography>
            <Button
              variant="contained"
              color="info"
              size="large"
              sx={{
                width: 'fit-content',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Sign up
            </Button>
          </Box>
        </SlideContainer>
      ))}

<NavButton
  onClick={prevSlide}
  sx={{ right: 16, top: '60%' }} // Adjust '30%' to position it vertically
  aria-label="Previous slide"
>
  <ArrowBack />
</NavButton>
<NavButton
  onClick={nextSlide}
  sx={{ right: 16, top: '70%' }} // Adjust '70%' to position it vertically
  aria-label="Next slide"
>
  <ArrowForward />
</NavButton>
    </CarouselContainer>
  );
};

export default Carousel;
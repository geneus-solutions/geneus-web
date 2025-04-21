import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./SecondCrousle.css";
// import '../../assets'
import imageOne from '../../assets/_Instagram Facebook Stories Ads - Last Chance (1080 x 1920 px).jpg';
import imageTwo from '../../assets/Black Modern Musik Festival (Pinterest Pin (1080 x 1920)) (1).jpg';
import imageThree from '../../assets/Black Modern Tablet Mockup Social Media Marketing Guide Instagram Story (2).jpg';

const slides = [
  {
    id: 1,
    title: "Comprehensive Tracking",
    description:
      "Fast barcode scanner, accurate 1,775,000 foods database, with detailed macros and 107 nutrients, make tracking your diet a breeze in MyNetDiary.",
    image: imageOne,
  },
  {
    id: 2,
    title: "Smart Food Logging",
    description:
      "Easily log your meals with an intuitive interface, ensuring you stay on track with your nutritional goals.",
    image: imageTwo,
  },
  {
    id: 3,
    title: "Detailed Insights",
    description:
      "Get precise data about your calorie intake and nutrient distribution for a healthier lifestyle.",
    image: imageThree,
  },
];

const CustomCarousel = () => {
  return (
    <div className="carousel-container-second">
    <h1 className='heading'>Compehersice Traking</h1>
      <Carousel autoPlay={true} showArrows={false} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={true}>
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img src={slide.image} alt={slide.title} className="carousel-image" />
            <div className="carousel-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CustomCarousel;
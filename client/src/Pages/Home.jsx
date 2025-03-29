import React from "react";
import AboutUs from "../components/HomeComponents/AboutUs";
import OurServices from "../components/HomeComponents/ServicesTwo";
import PopularCourse from "../components/HomeComponents/PopularCourse";
import Heilight from "../components/HomeComponents/Heilight";
import HomeCarousel from "../components/HomeComponents/HomeCarousel";
const Home = () => {

  return (
    <div>
      <HomeCarousel/>
      <AboutUs />
      {/* <OurServices /> */}
      <OurServices/>
      <PopularCourse />
      {/* <Heilight /> */}
    </div>
  );
};

export default Home;

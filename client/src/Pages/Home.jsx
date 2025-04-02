import React from "react";
import AboutUs from "../components/HomeComponents/AboutUs";
import PopularCourse from "../components/HomeComponents/PopularCourse";
import Heilight from "../components/HomeComponents/Heilight";
import HomeCarousel from "../components/HomeComponents/HomeCarousel";
import OurServices from "../components/HomeComponents/OurServices";
const Home = () => {

  return (
    <div>
      <HomeCarousel/>
      <AboutUs />
      <OurServices/>  
      <PopularCourse />
      {/* <Heilight /> */}
    </div>
  );
};

export default Home;

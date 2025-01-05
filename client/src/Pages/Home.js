import React from "react";
import Carousel from "../components/HomeComponents/Crousal";
import AboutUs from "../components/HomeComponents/AboutUs";
import OurServices from "../components/HomeComponents/OurServices";
import PopularCourse from "../components/HomeComponents/PopularCourse";
import Heilight from "../components/HomeComponents/Heilight";
const Home = () => {

  return (
    <div>
      <Carousel />
      <AboutUs />
      <OurServices />
      <PopularCourse />
      <Heilight />
    </div>
  );
};

export default Home;

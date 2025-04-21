import React from "react";
import "./RecipeCarousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const recipes = [
  {
    title: "Delicious quinoa with",
    ingredients: 7,
    time: "35 minutes",
    calories: "326 cals/serving",
    image:
      "https://i.pinimg.com/736x/44/6a/6b/446a6b3c45570d38cc7894c9a33b92e0.jpg",
  },
  {
    title: "Arugula Avocado Salad",
    ingredients: 13,
    time: "20 minutes",
    calories: "385 cals/serving",
    image:
      "https://i.pinimg.com/736x/e0/f2/da/e0f2da93ab3ea32fcfd4acafc069baf1.jpg",
  },
  {
    title: "Lean and Tasty Turkey Chili",
    ingredients: 15,
    time: "90 minutes",
    calories: "166 cals/serving",
    image:
      "https://i.pinimg.com/736x/4f/d7/7b/4fd77bba36f85345b997cbeb6403b50d.jpg",
  },
];

const RecipeCarousel = () => {
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
    <h2 className="carousel-title">Premium Recipes that Fit Your Lifestyle</h2>
    <p className="carousel-description">
      Hundreds of easy recipes, with great variety, carefully crafted for great
      taste by MyNetDiary's team of Registered Dietitians. Here are a few
      sample recipes:
    </p>
    <Slider {...settings} className="carousel-slider">
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card-wrapper">
          <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="text-container">
            <h3 className="recipe-title">{recipe.title}</h3>
            <div className="recipe-info-container">

            <p className="recipe-info">{recipe.ingredients} ingredients</p>
            <p className="recipe-info">{recipe.time}</p>
            <p className="recipe-info">{recipe.calories}</p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default RecipeCarousel;

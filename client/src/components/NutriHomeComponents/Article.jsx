import React from "react";
import "./Article.css";

const articles = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/08/34/2c/08342c2ed26b1cd59788f61fb17b2ada.jpg",
    title: "Smart Calorie Planning with Nutri App",
    description:
      "Stop guessing your daily calorie needs. With Nutri App, you can calculate your personalized calorie requirement based on your body metrics and lifestyle. Avoid under-eating or over-eating, and start reaching your health goals with confidence. Nutri App makes it easy to plan and track your calories for effective weight management.",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/474x/5b/3d/be/5b3dbe6ed5cda0380015050a9deab509.jpg",
    title: "Build Healthy Eating Habits",
    description:
      "Healthy eating is simple with Nutri App. Focus on fresh, whole foods, balanced portions, and staying hydrated. Nutri App supports you every step of the way with smart meal planning and nutritional insights, helping you build habits that last a lifetime.",
  },
];


const Article = () => {
  return (
    <div className="food-tracking-container">
      {articles.map((article) => (
        <div key={article.id} className="food-tracking-card">
          <img
            src={article.image}
            alt={article.title}
            className="food-tracking-image"
          />
          <div className="food-tracking-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;

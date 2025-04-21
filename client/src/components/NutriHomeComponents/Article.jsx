import React from "react";
import "./Article.css";

const articles = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/08/34/2c/08342c2ed26b1cd59788f61fb17b2ada.jpg",
    title: "Planning weight & calories",
    description:
      "Good news! You can stop guessing at how many calories you need to control your weight. When you guess at what you need, you are more likely to consume too few or too many calories, thereby preventing you from meeting your goal. That is frustrating and erodes confidence. Instead, use MyNetDiary to plan and track calories so that you meet your weight goal safely and effectively.",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/474x/5b/3d/be/5b3dbe6ed5cda0380015050a9deab509.jpg",
    title: "Healthy Eating Habits",
    description:
      "Eating healthy doesn’t have to be complicated. Focus on whole, nutritious foods, balance your meals, and stay hydrated. Using MyNetDiary can help you stay on track with your goals effortlessly.",
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

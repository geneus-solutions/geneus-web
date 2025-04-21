import React from "react";

import { TiTick } from "react-icons/ti";

import "../../styles/HowItWorks.css"; // Import the CSS file

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h2>It works!</h2>
      <p style={{marginTop:'30px'}}>
        You shed pounds by consuming fewer calories than your body burns.Our Premium diet plan optimizes your meals to help you reach your 
        target weight on schedule. It ensures a balanced intake of carbs, protein, and fats throughout your weight loss journey. 
        With simple and tasty Premium Recipes, you can enjoy healthy meals while staying within your budget.Plus, you'll gain insights into 
        smarter food choices, appropriate portion sizes, and sustainable eating habits for long-term health success
      </p>

      <p className="highlights-text" style={{marginTop:'30px'}}>HIGHLIGHTS</p>

      <div className="highlights">
        <ul>
          <li><TiTick style={{fontSize:'20px',color:'green'}} /> No forbidden foods. Well-balanced nutrition</li>
          <li><TiTick style={{fontSize:'20px',color:'green'}} /> Considered the healthiest option for weight loss</li>
        </ul>
        <ul>
          <li><TiTick style={{fontSize:'20px',color:'green'}} /> Hundreds of Premium Recipes</li>
          <li><TiTick style={{fontSize:'20px',color:'green'}} /> Excellent for long-term maintenance</li>
        </ul>
      </div>

      <button className="cta-button">READ MORE ABOUT DIET</button>

      {/* Curved Bottom */}
      <div className="curved-bottom"></div>
    </div>
  );
};

export default HowItWorks;

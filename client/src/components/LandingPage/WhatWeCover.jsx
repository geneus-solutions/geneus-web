import React from "react";
import "./WhatWeCover.css"; 

const WhatWeCover = ({heading, description}) => {
  return (
    <div className="what-we-cover">
      <div className="heading">
        <p className="trading-beyond-stock">
          {heading}
        </p>
      </div>

      <p className="profitable-stock">
       {description}
      </p>
    </div>
  );
};

export default WhatWeCover;

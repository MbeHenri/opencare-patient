import React, { useState } from "react";
import "./Notation.css";

function Notation() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
          >
            <span className="star fs-2">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default Notation;




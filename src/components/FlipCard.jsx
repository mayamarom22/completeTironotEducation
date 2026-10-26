import React, { useState} from "react";


function FlipCard({ back, front, onFlip, children}) {
  const [flipped, setFlipped] = useState(false);
  const [counted, setCounted] = useState(false);

  const handleClick = () => {
    setFlipped((prev) => !prev);

    // סופרים רק בפעם הראשונה
    if (!counted) {
      setCounted(true);
      if (onFlip) onFlip();
    }
  };

  return (
    <div className={`flip-card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="textFront">{front}</p>
        </div>
        <div className="flip-card-back">
  {children ? (
    children
  ) : (
    <p className="textBack">{back}</p>
  )}
</div>
      </div>
    </div>
  );
}

export default FlipCard;
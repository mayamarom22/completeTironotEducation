import React, { useState, useEffect } from "react";
import FlipCard from "../components/FlipCard";
import "../css/IDFspirit.css";
import narrowBtnFlip from "../assets/images/IDFspirit/narrowBtnFlip.png";


function FlipCardContainer({
  setPage,
  answers,
  setAnswers,
  flipped,
  setFlipped,
  onCompleteChange
}) {
  // 👇 הכרטיסים שלך – תשני לפי הצורך
  const cards = [
    { front: "דבקות במשימה וחתירה לניצחון" },
    { front: "אחריות" },
    { front: "אמינות" },
    { front: "דוגמה אישית" },
    { front: "חיי אדם" },
    {front: "טוהר הנשק"},
    {front: "מקצועיות"},
    {front: "משמעת"},
    {front: "רעות"},
    { front: "שליחות" },
  ];

  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    cards.slice(0, 5),
    cards.slice(5, 10),
  ];

  const currentCards = pages[pageIndex];

  const handleFlip = (cardIndex) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.add(cardIndex);
      return next;
    });
  };

  const handleInputChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const allFlipped = flipped.size === cards.length;

  // 💡 (אופציונלי) לבדוק שגם כתבו משהו
  const answeredCount = Object.values(answers).filter(
    (val) => val.trim() !== ""
  ).length;
  
  const isDone = answeredCount >= 5;
  useEffect(() => {
    const answeredCount = Object.values(answers).filter(v => v.trim() !== "").length;
    onCompleteChange?.(answeredCount >= 5);
  }, [answers]);

    const remaining = Math.max(0, 5 - answeredCount);
  return (
    <div className="flip-page">

      <div className={`cards-wrapper slide-${pageIndex}`}>
        {currentCards.map((card, index) => {
          const globalIndex = pageIndex * 5 + index;

          return (
            <FlipCard
              key={globalIndex}
              front={card.front}
              back={null}
              onFlip={() => handleFlip(globalIndex)}
            >
              <textarea
                className="card-input"
                placeholder="כתבו..."
                value={answers[globalIndex] || ""}
                onClick={(e) => e.stopPropagation()} // חשוב!
                onChange={(e) =>
                  handleInputChange(globalIndex, e.target.value)
                }
              />
            </FlipCard>
          );
        })}
      </div>
      <div className="progress-text">
  {!isDone ? (
    <p>נשארו עוד {remaining} תשובות</p>
  ) : (
    <p className="done-text">מעולה! אפשר להמשיך</p>
  )}
</div>
      <div className="cards-navigation">
      <img src={narrowBtnFlip} alt="narrowBtnFlip" className={`narrowBtnFlip narrowBtnFlip-L ${pageIndex === 0 ? "disabled" : ""}`}
          onClick={() => setPageIndex(0)} />
        <img src={narrowBtnFlip} alt="narrowBtnFlip" className={`narrowBtnFlip ${pageIndex === 1 ? "disabled" : ""}`}
          onClick={() => setPageIndex(1)} />


      </div>


    </div>
  );
}

export default FlipCardContainer;
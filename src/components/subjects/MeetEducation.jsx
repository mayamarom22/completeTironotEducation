import React, { useState, useEffect } from "react";
import "../../css/meetEducation.css";
import IconBahadStars from "../../components/IconBahadStars";
import IconBahadClick from "../../components/IconBahadClick";
import ArrayEducation from "../../components/ArrayEducation";
import ArrayShield from "../../components/ArrayShield";

import sparkleSound from "../../assets/audio/sparkle.mp3";

import fairyBubbleTalk from "../../assets/images/characters/fairy/bubbleTalk.svg";
import elfBubbleTalk from "../../assets/images/characters/elf/bubbleTalk.svg";
import fairyBubbleTalkBrown from "../../assets/images/characters/fairyBrown/bubbleTalk.svg";
import elfBubbleTalkBrown from "../../assets/images/characters/elfBrown/bubbleTalk.svg";

import fairyComment from "../../assets/images/characters/fairy/comment.svg";
import elfComment from "../../assets/images/characters/elf/comment.svg";
import fairyCommentBrown from "../../assets/images/characters/fairyBrown/comment.svg";
import elfCommentBrown from "../../assets/images/characters/elfBrown/comment.svg";

import arrayEduImg from "../../assets/images/meetEducation/arrayEduImg.png";
import fairyBubbles from "../../assets/images/characters/fairy/bubblesCharacter.svg";
import elfBubbles from "../../assets/images/characters/elf/bubblesCharacter.svg";
import fairyBubblesBrown from "../../assets/images/characters/fairyBrown/bubblesCharacter.svg";
import elfBubblesBrown from "../../assets/images/characters/elfBrown/bubblesCharacter.svg";
import arrayShieldImg from "../../assets/images/meetEducation/arrayShieldImg.png";
import viArrays from "../../assets/images/meetEducation/viArrays.png";
import bubbleTivoh from "../../assets/images/meetEducation/tivoh.svg";
import bubbleSamhot from "../../assets/images/meetEducation/samhot.svg";

import { useCharacter } from "../../context/CharacterContext";
import nextBtn from "../../assets/images/introduction/nextBtn.png";
import backBtn from "../../assets/images/introduction/backBtn.png";

function MeetEducation({
  page,
  setPage,
  goNext,
  goBack,
  finishSubject,
  isNextUnlocked,
  unlockCurrentPage,
  progress,
  setProgress,
}) {
  const totalPages = 6; // מספר העמודים בנושא
  const progressValue = page === 0 ? 0 : page;
  const totalProgressPages = totalPages - 1;

  const [showStars, setShowStars] = useState(false); // מצב לפייד אין
  const [allFlamesClicked, setAllFlamesClicked] = useState(false);

  const handleAllFlamesClicked = (value) => {
    setAllFlamesClicked(value);

    if (value) {
      unlockCurrentPage();
    }
  };
  // useEffect שיעלה את הכוכבים אחרי 2 שניות
  useEffect(() => {
    if (page === 0) {
      setShowStars(false); // לוודא איפוס כשחוזרים לדף
      const timer = setTimeout(() => setShowStars(true), 500);
      return () => clearTimeout(timer); // לנקות הטיימר אם הקומפוננטה נעלמת
    } else {
      setShowStars(false); // אם לא בעמוד 0, לא להראות כוכבים
    }
  }, [page]);

  useEffect(() => {
    if (showStars) {
      const audio = new Audio(sparkleSound);
      audio.volume = 0.6; // אופציונלי
      audio.play().catch(() => {
        // מונע קריסה אם הדפדפן חוסם autoplay
      });
    }
  }, [showStars]);

  // const handleNext = () => {
  //   if (page < totalPages - 1) {
  //     setPage(page + 1);
  //   } else {
  //     finishSubject();
  //   }
  // };

  // const handleBack = () => {
  //   if (page > 0) {
  //     setPage(page - 1);
  //   } else {
  //     goToPrevSubject();
  //   }
  // };

  const { character, isGadna } = useCharacter();

  const characterImg =
  character === "fairy"
    ? isGadna
      ? fairyBubbleTalkBrown
      : fairyBubbleTalk
    : isGadna
      ? elfBubbleTalkBrown
      : elfBubbleTalk;

const characterImg2 =
  character === "fairy"
    ? isGadna
      ? fairyCommentBrown
      : fairyComment
    : isGadna
      ? elfCommentBrown
      : elfComment;

const characterImgbubbles =
  character === "fairy"
    ? isGadna
      ? fairyBubblesBrown
      : fairyBubbles
    : isGadna
      ? elfBubblesBrown
      : elfBubbles;

  // בחירת מערך
  const {
    selectedArray,
    finishedArrays,
    arraysProgress,
  } = progress;

  const finishArray = (arrayName) => {
    setProgress({
      finishedArrays: {
        ...finishedArrays,
        [arrayName]: true,
      },
      selectedArray: null,
    });
  };
  useEffect(() => {
    if (page === 4 && finishedArrays.edu && finishedArrays.shield && !isNextUnlocked) {
      unlockCurrentPage();
    }
  }, [page, finishedArrays.edu, finishedArrays.shield, isNextUnlocked]);

// התקדמות במערכים

const updateArrayProgress = (arrayName, changes) => {
  setProgress({
    arraysProgress: {
      ...arraysProgress,
      [arrayName]: {
        ...arraysProgress[arrayName],
        ...changes,
      },
    },
  });
};

  // תנאי לכפתור
  const canGoNext = !(
    (page === 1 && !allFlamesClicked) ||
    (page === 4 && (!finishedArrays.edu || !finishedArrays.shield))
  );

  return (
    <div>
      {/* {page !== 0 && (
      <div className="progress-indicator">
        {progress} / {totalProgressPages}
      </div>
      )} */}
      {page !== 0 && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(progressValue / totalProgressPages) * 100}%`,
            }}
          />
        </div>
      )}
      {page === 0 && (
        <div className="page1 page">
          <p className="title-chapter">- פרק 1 -</p>
          <p className="title-content-chapter">הכירו את חיל החינוך</p>
          <p className="sec-title-content">
            בפרק זה נכיר את החיל, הערכים שלו והתפקידים המרכזיים בו.
          </p>

          {/* Fade In אחרי 2 שניות */}
          {showStars && (
            <div className="stars-fade">
              <IconBahadStars />
            </div>
          )}
        </div>
      )}

      {page === 1 && (
        <div className="page2 page">
          <p className="title-content">משמעות הסמל</p>
          <p className="text-content">
            סמל חיל החינוך מייצג את שלושת מרכזי פועלו- הלהבה הרביעית מייצגת
            מפקדת החיל.
          </p>
          <p className="sec-title-content">לחצו על הלהבות!</p>
          <IconBahadClick onAllFlamesClicked={handleAllFlamesClicked} />
        </div>
      )}

      {page === 2 && (
        <div className="page3 page">
          <p className="title-content">ייעודו של החיל</p>
          <img
            src={characterImg}
            alt="chosen character"
            className="bubbleTalkImg"
          />
          <p className="bubble-text">
            ייעודו של חיל החינוך הוא להוות סמכות מקצועית המקדמת את תחום
            הפיקודי-חינוכי והתחום הלאומי חברתי בצה”ל ובמדינה.
          </p>
        </div>
      )}

      {page === 3 && (
        <div className="page4 page">
          <p className="title-content"> מבנה חיל החינוך</p>
          <p className="sec-title-content">בית ספר למקצועות החינוך</p>
          <p className="text-content">זהו למעשה- בה”ד(בסיס הדרכה) החינוך.</p>
          <p className="text-content">
            אמון על הכשרת כוח אדם בחיל החינוך והנוער.
          </p>
          <p className="text-content">
            ההכשרות בבית הספר כוללות הכשרות יסוד(טירונים המתגייסים לתפקיד ראשון
            והן הכשרות קצינים והשתלמויות חיליות).
          </p>
          <img
            src={characterImg2}
            alt="chosen character"
            className="commentImg-bahad"
          />
          <p className="comment-text">ממש איפה שאתם עכשיו!</p>
        </div>
      )}
      {page === 4 && (
        <div className="page5 page">
          {!selectedArray && (
            <>
              <p className="title-content"> מבנה חיל החינוך</p>
              <p className="sec-title-content">מערך חינוך ומערך מגן</p>
              <p className="text-content">
                מערכים אלו עובדים בשיתוף פעולה כדי לענות על מטרות החיל.
              </p>
              <p className="sec-title-content instArray">
                לחצו לפירוט על המערכים!
              </p>

              <div className="container-arrays-images">
                <img
                  src={arrayEduImg}
                  alt="arrayEdu"
                  className="arrays-images arrayEdu"
                  onClick={() => setProgress({ selectedArray: "edu" })}
                />

                <img
                  src={arrayShieldImg}
                  alt="arrayShield"
                  className="arrays-images arrayShield"
                  onClick={() => setProgress({ selectedArray: "shield" })}
                />
              </div>

              {finishedArrays.edu && (
                <img src={viArrays} alt="viArrays" className="viArrayEdu" />
              )}

              {finishedArrays.shield && (
                <img src={viArrays} alt="viArrays" className="viArrayshield" />
              )}
            </>
          )}

          {selectedArray === "edu" && (
            <ArrayEducation
            progress={arraysProgress.edu}
            setProgress={(changes) => updateArrayProgress("edu", changes)}
            finish={() => finishArray("edu")}
          />
          )}

          {selectedArray === "shield" && (
            <ArrayShield
            progress={arraysProgress.shield}
            setProgress={(changes) => updateArrayProgress("shield", changes)}
            finish={() => finishArray("shield")}
          />
          )}
        </div>
      )}

      {page === 5 && (
        <div className="page4 page">
          <p className="title-content"> מבנה חיל החינוך</p>
          <p className="sec-title-content">מטה החיל</p>
          <p className="text-content">למטה יש שתי מטרות</p>
          <img
            src={characterImgbubbles}
            alt="chosen character"
            className="bubble-character-Img"
          />
          <div className="bubbles-container">
            <img src={bubbleTivoh} alt="bubbleTivoh" className="bubbles" />
            <img src={bubbleSamhot} alt="bubbleSamhot" className="bubbles" />
          </div>
        </div>
      )}

      {!selectedArray && (
        <div className="container-buttons">
          <img
            src={backBtn}
            alt="back"
            className="backBtn nav-btns"
            onClick={goBack}
          />
          <img
            src={nextBtn}
            alt="next"
            className={`nextBtn nav-btns ${!isNextUnlocked ? "disabled" : ""}`}
            onClick={() => isNextUnlocked && goNext()}
          />
        </div>
      )}
    </div>
  );
}

export default MeetEducation;

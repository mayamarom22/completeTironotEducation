import React, { useState, useEffect } from "react";
import nextBtn from "../../assets/images/introduction/nextBtn.png";
import backBtn from "../../assets/images/introduction/backBtn.png";
import SpiritWithStars from "../../components/SpiritWithStars";
import butterfly from "../../assets/images/IDFspirit/butterfly.png";
import idfSpiritImg from "../../assets/images/IDFspirit/idfSpiritImg.svg";
import spiritMavo from "../../assets/images/IDFspirit/spiritMavo.svg";
import spiritHagdara from "../../assets/images/IDFspirit/spiritHagdara.svg";
import spiritYesod from "../../assets/images/IDFspirit/spiritYesod.svg";
import spiritArahim from "../../assets/images/IDFspirit/spiritArahim.svg";
import spiritParts from "../../assets/images/IDFspirit/spiritParts.svg";
import popUpValues from "../../assets/images/IDFspirit/popUpValues.svg";
import btnHard from "../../assets/images/IDFspirit/btnHard.png";

import sparkleSound from "../../assets/audio/sparkle.mp3";

import { useCharacter } from "../../context/CharacterContext";
import { useLearningProgress } from "../../context/LearningProgressContext";
import fairyComment from "../../assets/images/characters/fairy/comment.svg";
import elfComment from "../../assets/images/characters/elf/comment.svg";
import fairyBrownComment from "../../assets/images/characters/fairyBrown/comment.svg";
import elfBrownComment from "../../assets/images/characters/elfBrown/comment.svg";

import "../../css/IDFspirit.css";
import FlipCardContainer from "../../components/FlipCardContainer.jsx";

function IDFspirit({
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
  const [showStars, setShowStars] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { learningProgress } = useLearningProgress();
  const selectedCourse = learningProgress?.userDetails?.course || "";
  const isEducationCourse = selectedCourse === "חינוך";
  const {
    text,
    isSubmitted,
    confirmSubmit,
    showComment,
    flipDone,
    flipAnswers,
    flipFlipped,
  } = progress;

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

  const totalPages = 10; // מספר העמודים בנושא
  const progressValue = page === 0 ? 0 : page;
  const totalProgressPages = totalPages - 1;
  const handleNext = () => {
    if (page === 7) {
      setShowPopup(true);
      return;
    }

    goNext();
  };

  const handleBack = () => {
    goBack();
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    if (text.trim() === "") return;

    // לחיצה ראשונה → רק אזהרה
    if (!confirmSubmit) {
      setShowWarning(true);
      setProgress({ confirmSubmit: true });

      setTimeout(() => {
        setShowWarning(false);
      }, 4500);

      return;
    }

    // לחיצה שנייה → הגשה אמיתית
    setProgress({ isSubmitted: true });
  };

  const { character, isGadna: isGadnaFromContext = false } = useCharacter();

  const normalizedCourse = selectedCourse.replace(/[״"]/g, "");

  const isGadna =
    isGadnaFromContext ||
    selectedCourse === "gadna" ||
    normalizedCourse.includes("גדנע");

  const characterImg =
    character === "fairy"
      ? isGadna
        ? fairyBrownComment
        : fairyComment
      : isGadna
        ? elfBrownComment
        : elfComment;

  // תנאי לכפתור
  const isNextDisabled = !isNextUnlocked;
  useEffect(() => {
    if (page === 1 && isSubmitted && !isNextUnlocked) {
      unlockCurrentPage();
    }

    if (page === 8 && flipDone && !isNextUnlocked) {
      unlockCurrentPage();
    }
  }, [page, isSubmitted, flipDone, isNextUnlocked]);

  return (
    <div>
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
          <p className="title-chapter">- פרק 2 -</p>
          <p className="title-content-chapter">רוח צה"ל</p>
          <p className="sec-title-content">
            בפרק זה נלמד על רוח צה”ל, חשיבותה וחלקיה.
          </p>

          {/* Fade In אחרי 2 שניות */}
          {showStars && (
            <div className="stars-fade">
              <SpiritWithStars />
            </div>
          )}
        </div>
      )}

      {page === 1 && (
        <div className="page2 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">
            רוח צהל נועדה להגדיר ערכים מובילים לאורם יפעלו חיילי ומפקדי צה"ל
          </p>
          <p className="text-content">
            למה לדעתך חשוב שיהיו לצה”ל ערכים מובילים?
          </p>
          <div className="input-wrapper">
            <textarea
              className="styled-textarea"
              placeholder="שתפו מחשבה..."
              value={text}
              onChange={(e) => setProgress({ text: e.target.value })}
              disabled={isSubmitted}
            />
            <img src={butterfly} className="butterfly" />
          </div>

          {showWarning && (
            <div className="tooltip">שימו לב – לא תוכלו לערוך אחרי ההגשה</div>
          )}

          <button
            className={`submit-btn ${isSubmitted ? "submitted" : ""}`}
            onClick={handleSubmit}
            disabled={text.trim() === "" || isSubmitted}
          >
            {isSubmitted ? "הוגש ✓" : "הגש"}
          </button>
        </div>
      )}

      {page === 2 && (
        <div className="page3 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="text-content">
            כדי שצה"ל יוכל לתפקד בצורה הטובה ביותר, צריך שיהיו מוטמעים אצל
            החיילים ערכים התומכים במשימה, שומרים על צה"ל צבא מוסרי, שומרים על
            סדר וארגון.
          </p>
          <p className="text-content">
            לא ברור לגמרי? בואו נדבר על הערכים עצמם זה בטח יעזור לכם להבין...
          </p>
          <img src={idfSpiritImg} alt="idfSpiritImg" className="idfSpiritImg" />
        </div>
      )}

      {page === 3 && (
        <div className="page4 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">"הבא" מוביל להסבר על כל שקופית</p>
          <img src={spiritParts} alt="spiritParts" className="spiritParts" />
        </div>
      )}
      {page === 4 && (
        <div className="page5 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">"הבא" מוביל להסבר על כל פסקה</p>
          <img src={spiritMavo} alt="spiritMavo" className="spiritParts" />
        </div>
      )}
      {page === 5 && (
        <div className="page6 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">"הבא" מוביל להסבר על כל פסקה</p>
          <img
            src={spiritHagdara}
            alt="spiritHagdara"
            className="spiritParts"
          />
        </div>
      )}
      {page === 6 && (
        <div className="page7 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">"הבא" מוביל להסבר על כל פסקה</p>
          <img src={spiritYesod} alt="spiritYesod" className="spiritParts" />
        </div>
      )}
      {page === 7 && (
        <div className="page8 page">
          <p className="title-content">חשיבות רוח צה"ל</p>
          <p className="sec-title-content">"הבא" מוביל להסבר על כל פסקה</p>
          <img src={spiritArahim} alt="spiritArahim" className="spiritParts" />
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content-value">
                <img src={popUpValues} alt="popUpValues" />

                <button
                  className="popup-btn"
                  onClick={() => {
                    setShowPopup(false);
                    goNext();
                  }}
                >
                  המשך
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {page === 8 && (
        <div className="page9 page">
          <p className="title-content">משימה</p>
          <p className="sec-title-content">ערכי צה"ל</p>
          <p className="text-content">
            {" "}
            <b>לחצו</b> על הקלפים עליהם הערכים המופיעים ברוח צה”ל.
          </p>
          <p className="text-content">
            כתבו על חמישה ערכים, מדוע הוא חשוב לדעתכם לביצוע המשימות ולמימוש
            ייעודו של צה”ל, (כפי שרשום במבוא של רוח צה”ל)
          </p>
          <FlipCardContainer
            setPage={setPage}
            answers={flipAnswers}
            setAnswers={(value) => {
              if (typeof value === "function") {
                setProgress({
                  flipAnswers: value(flipAnswers),
                });
              } else {
                setProgress({
                  flipAnswers: value,
                });
              }
            }}
            flipped={new Set(flipFlipped)}
            setFlipped={(value) => {
              if (typeof value === "function") {
                const result = value(new Set(flipFlipped));
                setProgress({
                  flipFlipped: Array.from(result),
                });
              } else {
                setProgress({
                  flipFlipped: Array.from(value),
                });
              }
            }}
            onCompleteChange={(value) => setProgress({ flipDone: value })}
          />
        </div>
      )}

      {page === 9 && (
        <div className="page10 page">
          <p className="title-content">סיכום רוח צה"ל</p>
          <p className="sec-title-content">אז מה למדנו על רוח צה"ל?</p>
          <p className="text-content">
            למדנו מהי רוח צה"ל, ולמה חשוב שיובילו אותנו ערכים בעת ביצוע המשימה.{" "}
          </p>
          <p className="text-content">
          {isEducationCourse
    ? `תפקידכם כמש"קי חינוך יהיה להטמיע אותם ביחידות אליהן תגיעו! וכמובן,
       מי מכם שיהיה מש"ק הסברה יקדם ערכים אלו בהסברות שיעביר.`
    : `חלק מתפקידכם כחיילים לעתיד בחיל החינוך יהיה להטמיע ולפעול לפי ערכים אלו במקומות אליהם תגיעו בשירותכם הצבאי!`}
          </p>
          <img
            className={`btnHard ${!showComment ? "grow-shrink" : ""}`}
            src={btnHard}
            alt="btnHard"
            onClick={() => setProgress({ showComment: true })}
          />
          {showComment && (
            <>
              <img
                src={characterImg}
                alt="chosen character"
                className="commentImg"
              />
              <p className="comment-hard-text">
                מזל שיש עוד פרק אחד...יאללה לחצו הבא!
              </p>
            </>
          )}
        </div>
      )}

      <div className="container-buttons">
        <img
          src={backBtn}
          alt="back"
          className="backBtn nav-btns"
          onClick={handleBack}
        />
        <img
          src={nextBtn}
          alt="next"
          className={`nextBtn nav-btns ${isNextDisabled ? "disabled" : ""}`}
          onClick={() => {
            if (isNextDisabled) return;
            handleNext();
          }}
        />
      </div>
    </div>
  );
}

export default IDFspirit;

// src/pages/OpeningPage.jsx
import React, { useState } from "react";
import "../css/OpeningPage.css";
import { useNavigate } from "react-router-dom";

import About from "../components/About";
import UserDetails from "../components/UserDetails";

import { useLearningProgress } from "../context/LearningProgressContext";
import { useCharacter } from "../context/CharacterContext";

function OpeningPage() {
  const navigate = useNavigate();

  const { setLearningProgress } = useLearningProgress();

  const {
    character,
    setCharacter,
    setSelectedCourse,
  } = useCharacter();

  const [page, setPage] = useState(1);
  const [fade, setFade] = useState("");

  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("");

  const courses = ["חינוך", 'גדנ"ע', "גשרים", 'הו"ד', "תקומה"];

  const nameError =
    userName && /\d/.test(userName)
      ? "אין להזין מספרים בשם"
      : "";

  const formValid =
    userName.trim() !== "" &&
    !nameError &&
    course !== "";

  const goToSecondPage = () => {
    setFade("fade-out");

    setTimeout(() => {
      setPage(2);
      setFade("fade-in");
    }, 500);
  };

  const toggleCharacter = () => {
    setCharacter((currentCharacter) =>
      currentCharacter === "fairy" ? "elf" : "fairy"
    );
  };

  const startLearning = () => {
    setSelectedCourse(course);

    setLearningProgress((prev) => ({
      ...prev,
      userDetails: {
        ...prev.userDetails,
        userName,
        course,
      },
    }));

    navigate("/content");
  };

  return (
    <div className={`open-text-container ${fade}`}>
      {page === 1 && (
        <>
          <About />

          <p className="opening-title">
            לומדת השלמת טירונות חיל חינוך
          </p>

          <p className="opening-text bold">
            ברוכים הבאים לחיל החינוך!
          </p>

          <p className="opening-text regular">
            החיילים בקורסים שלנו עוברים לרוב טירונות בבה”ד החינוך
            וכבר שם מתחילים ללמוד מעט על החיל והתפקיד
          </p>

          <p className="opening-text bold">
            מדאיג אותך? אין צורך!
          </p>

          <p className="opening-text regular">
            הלומדה הזו תשלים לך את כל המידע שצריך!
          </p>

          <div className="btn-start-div" onClick={goToSecondPage}>
            <p className="btn-text">בואו נכיר!</p>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <UserDetails
            userName={userName}
            setUserName={setUserName}
            course={course}
            setCourse={setCourse}
            courses={courses}
            nameError={nameError}
          />

          {/* כפתור החלפת הדמות */}
          <div
            className="btn-character-div"
            onClick={toggleCharacter}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                toggleCharacter();
              }
            }}
          >
            <p className="change-btn">החלף דמות</p>
          </div>

          <button
            className={`toIntro-btn ${
              !formValid ? "disabled-btn" : ""
            }`}
            disabled={!formValid}
            onClick={startLearning}
          >
            יאללה נתחיל!
          </button>
        </>
      )}
    </div>
  );
}

export default OpeningPage;
import React from "react";
import { useCharacter } from "../context/CharacterContext";

import fairyDetailsImg from "../assets/images/characters/fairy/detailsImg.svg";
import elfDetailsImg from "../assets/images/characters/elf/detailsImg.svg";

import fairyBrownDetailsImg from "../assets/images/characters/fairyBrown/detailsImg.svg";
import elfBrownDetailsImg from "../assets/images/characters/elfBrown/detailsImg.svg";

function UserDetails({
  userName,
  setUserName,
  course,
  setCourse,
  courses,
  nameError,
  courseError
}) {
  const {
    character,
    setCharacter,
    setSelectedCourse,
    isGadna
  } = useCharacter();

  const detailsImg =
    character === "fairy"
      ? isGadna
        ? fairyBrownDetailsImg
        : fairyDetailsImg
      : isGadna
        ? elfBrownDetailsImg
        : elfDetailsImg;

  const toggleCharacter = () => {
    setCharacter(character === "fairy" ? "elf" : "fairy");
  };

  const handleCourseChange = (e) => {
    const selectedValue = e.target.value;

    // שומר ב-state הרגיל של הקומפוננטה/הורה
    setCourse(selectedValue);

    // שומר גם ב-Context כדי שכל הלומדה תדע איזה קורס נבחר
    setSelectedCourse(selectedValue);
  };

  return (
    <div>
      <p className="opening-title">לומדת השלמת טירונות חיל חינוך</p>

      <p className="opening-text regular">
        שלום! <br />
        אני המלווה שלכם בלומדה! <br />
        לפני שמתחילים, הכניסו בבקשה שם ובחרו את הקורס אותו אתם עושים!
      </p>

      <div className="character-section">
        <img
          src={detailsImg}
          alt="character details"
          className="details-img"
        />

        <div className="user-inputs">
          <p className="input-title">שם:</p>

          <input
            type="text"
            placeholder="הכנס שם"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />

          {nameError && (
            <p className="error-text">{nameError}</p>
          )}

          <p className="input-title">קורס:</p>

          <select
            value={course}
            onChange={handleCourseChange}
            className="input-field"
          >
            <option value="">בחר קורס</option>

            {courses.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>

          {courseError && (
            <p className="error-text">{courseError}</p>
          )}
        </div>

        {/* <div
          className="btn-character-div"
          onClick={toggleCharacter}
        >
          <p className="change-btn">
            החלף דמות
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default UserDetails;
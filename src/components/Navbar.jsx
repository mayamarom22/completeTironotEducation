import React, { useState } from "react";
import "../css/Navbar.css";
import navbarIcon from "../assets/images/navbar/navbarIcon.png";
import SubjNavbar from "../components/SubjNavbar";

function Navbar({ subjNum, setSubjNum, completedSubjects, resetSubjectPage, visitedSubjects }) {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  const subjArr = ["מבוא", "הכירו את חיל החינוך", 'רוח צה"ל', 'מגילת צה"ל'];

  return (
    <div className="phone-navbar">
      {/* פס עליון עם שם הנושא */}
      <div className="the-stripe-topic">
        <p className="subj-text">{subjArr[subjNum]}</p>
      </div>

      <div
        className={`light-blue-circle ${showPhoneMenu ? "pop-out-menu" : ""}`}
      >
        {/* כפתור תפריט */}
        <img
          className={`menu-icon ${showPhoneMenu ? "open" : ""}`}
          src={navbarIcon}
          alt="menu-icon"
          onClick={() => setShowPhoneMenu(!showPhoneMenu)}
        />

        {showPhoneMenu && (
          <div className="menu-container">
            <div className="close-btn" onClick={() => setShowPhoneMenu(false)}>
              x
            </div>

            {/* SVG עם הנושאים */}
            <SubjNavbar
              subjNum={subjNum}
              setSubjNum={setSubjNum}
              completedSubjects={completedSubjects}
              resetSubjectPage={resetSubjectPage}
              visitedSubjects={visitedSubjects}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

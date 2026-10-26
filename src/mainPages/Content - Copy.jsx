import React, { useState } from "react";
import "../css/Content.css";
import Navbar from "../components/Navbar";
import Introduction from "../components/subjects/Introduction";
import MeetEducation from "../components/subjects/MeetEducation";
import IDFspirit from "../components/subjects/IDFspirit";
import IDFscroll from "../components/subjects/IDFscroll";

function Content() {
  // נושא נוכחי
  const [subjNum, setSubjNum] = useState(0);

  // אילו נושאים הושלמו
  const [completedSubjects, setCompletedSubjects] = useState([
    false,
    false,
    false,
    false,
  ]);

  // נושאים שביקרו בהם
  const [visitedSubjects, setVisitedSubjects] = useState([
    true,
    false,
    false,
    false,
  ]);

  // עמודים לכל נושא
  const [subjectPages, setSubjectPages] = useState([0, 0, 0, 0]);

  const subjArr = ["מבוא", "הכירו את חיל החינוך", "רוח צה\"ל", "מגילת צה\"ל"];

  // שינוי נושא (הפונקציה המרכזית והיחידה)
  const changeSubject = (index) => {
    setSubjNum(index);

    setVisitedSubjects((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  // עדכון עמוד
  const setPageForSubject = (index, page) => {
    setSubjectPages((prev) => {
      const updated = [...prev];
      updated[index] = page;
      return updated;
    });
  };

  // סימון נושא כהושלם
  const finishSubject = (index) => {
    setCompletedSubjects((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  // מעבר קדימה
  const goToNextSubject = () => {
    setSubjNum((prev) => {
      const next = Math.min(prev + 1, subjArr.length - 1);
      changeSubject(next);
      return next;
    });
  };

  // מעבר אחורה
  const goToPrevSubject = () => {
    setSubjNum((prev) => {
      const next = Math.max(prev - 1, 0);
      changeSubject(next);
      return next;
    });
  };

  // רינדור נושאים
  const renderSubject = () => {
    switch (subjNum) {
      case 0:
        return (
          <Introduction
            page={subjectPages[0]}
            setPage={(p) => setPageForSubject(0, p)}
            finishSubject={() => {
              finishSubject(0);
              goToNextSubject();
            }}
            totalPages={2}
          />
        );

      case 1:
        return (
          <MeetEducation
            page={subjectPages[1]}
            setPage={(p) => setPageForSubject(1, p)}
            finishSubject={() => {
              finishSubject(1);
              goToNextSubject();
            }}
            goToPrevSubject={goToPrevSubject}
            totalPages={2}
          />
        );

      case 2:
        return (
          <IDFspirit
            page={subjectPages[2]}
            setPage={(p) => setPageForSubject(2, p)}
            finishSubject={() => {
              finishSubject(2);
              goToNextSubject();
            }}
            goToPrevSubject={goToPrevSubject}
            totalPages={2}
          />
        );

      case 3:
        return (
          <IDFscroll
            page={subjectPages[3]}
            setPage={(p) => setPageForSubject(3, p)}
            goToPrevSubject={goToPrevSubject}
            totalPages={2}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-page">
      <Navbar
        subjNum={subjNum}
        setSubjNum={changeSubject} // 🔥 חשוב מאוד
        completedSubjects={completedSubjects}
        resetSubjectPage={(index) => setPageForSubject(index, 0)}
        visitedSubjects={visitedSubjects}
      />

      {renderSubject()}
    </div>
  );
}

export default Content;
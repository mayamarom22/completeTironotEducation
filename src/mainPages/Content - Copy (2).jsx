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
  // מעקב אחרי חסימת עמודים פנימית בנושא
  const [unlockedPages, setUnlockedPages] = useState([
    [true], // מבוא
    [true, false, true, true, false, true], // חיל החינוך- שני וחמישי
    [true, false, true, true, true, true, true, true, false, true], // רוח צהל- שני ותשיעי
    [true, false, false, true, true],
  ]);
  

  const unlockPage = (subjectIndex, pageIndex) => {
    setUnlockedPages((prev) => {
      const updated = prev.map((subject) => [...subject]);
      updated[subjectIndex][pageIndex] = true;
      return updated;
    });
  };
  const [subjectsProgress, setSubjectsProgress] = useState({
    meetEducation: {
      selectedArray: null,
      finishedArrays: {
        edu: false,
        shield: false,
      },
      arraysProgress: {
        edu: {
          hasClickedGoal: false,
          selectedTrack: null,
          currentIndex: 0,
          finishedTracks: {
            edu: false,
            exp: false,
          },
        },
        shield: {
          innerPage: 0,
          hasClickedGoal: false,
          hasClickedBtn: false,
          hasAnimated: false,
          allApplesDone: false,
          openedApple: null,
          applesWithWorm: [],
          hodCompleted: false,
        },
      },
    },
    idfSpirit: {
      text: "",
      isSubmitted: false,
      confirmSubmit: false,
      showComment: false,
      flipDone: false,
      flipAnswers: {},
      flipFlipped: [],
    },
    idfScroll: {
      isOpen: false,
      isOpenGoal: false,
      openedCount: 0,
      openedGroups: [],
    }
  });
  const updateMeetEducationProgress = (changes) => {
    setSubjectsProgress((prev) => ({
      ...prev,
      meetEducation: {
        ...prev.meetEducation,

        // 🔥 merge ל-arraysProgress אם קיים
        ...(changes.arraysProgress && {
          arraysProgress: {
            ...prev.meetEducation.arraysProgress,
            ...changes.arraysProgress,
          },
        }),

        // 🔥 merge רגיל לשאר
        ...changes,
      },
    }));
  };

  const updateIdfSpiritProgress = (changes) => {
    setSubjectsProgress((prev) => ({
      ...prev,
      idfSpirit: {
        ...prev.idfSpirit,
        ...changes,
      },
    }));
  };
  // מעבר קדימה
  const goNext = () => {
    const currentPage = subjectPages[subjNum];
    const maxPages = subjects[subjNum].pages;

    // חסימה גלובלית
    if (!unlockedPages[subjNum][currentPage]) {
      return;
    }

    // אם יש עוד עמודים
    if (currentPage < maxPages - 1) {
      setPageForSubject(subjNum, currentPage + 1);
      return;
    }

    // 🔥 כאן זה הסוף של הנושא
    finishSubject(subjNum);

    // מעבר לנושא הבא
    const next = Math.min(subjNum + 1, subjects.length - 1);

    setSubjNum(next);

    setVisitedSubjects((prev) => {
      const updated = [...prev];
      updated[next] = true;
      return updated;
    });

    setPageForSubject(next, 0);
  };

  // מעבר אחורה
  const goBack = () => {
    const currentPage = subjectPages[subjNum];

    if (currentPage > 0) {
      setPageForSubject(subjNum, currentPage - 1);
      return;
    }

    const prev = Math.max(subjNum - 1, 0);

    setSubjNum(prev);
    setPageForSubject(prev, subjects[prev].pages - 1);
  };

  const subjects = [
    {
      name: "מבוא",
      component: Introduction,
      pages: 1,
    },
    {
      name: "הכירו את חיל החינוך",
      component: MeetEducation,
      pages: 6,
    },
    {
      name: 'רוח צה"ל',
      component: IDFspirit,
      pages: 10,
    },
    {
      name: 'מגילת צה"ל',
      component: IDFscroll,
      pages: 5,
    },
  ];

  const CurrentSubject = subjects[subjNum].component;
  return (
    <div className="content-page">
      <Navbar
        subjNum={subjNum}
        setSubjNum={changeSubject} // 🔥 חשוב מאוד
        completedSubjects={completedSubjects}
        resetSubjectPage={(index) => setPageForSubject(index, 0)}
        visitedSubjects={visitedSubjects}
      />

      {/* 👇 זה הלב של המערכת */}
      <CurrentSubject
        page={subjectPages[subjNum]}
        setPage={(p) => setPageForSubject(subjNum, p)}
        goNext={goNext}
        goBack={goBack}
        finishSubject={() => finishSubject(subjNum)}
        isNextUnlocked={unlockedPages[subjNum][subjectPages[subjNum]]}
        unlockCurrentPage={() => unlockPage(subjNum, subjectPages[subjNum])}
        progress={
          subjNum === 2
            ? subjectsProgress.idfSpirit
            : subjectsProgress.meetEducation
        }
        setProgress={
          subjNum === 2 ? updateIdfSpiritProgress : updateMeetEducationProgress
        }
      />
    </div>
  );
}

export default Content;

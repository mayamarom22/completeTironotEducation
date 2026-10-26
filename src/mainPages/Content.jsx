import React from "react";
import "../css/Content.css";
import Navbar from "../components/Navbar";
import Introduction from "../components/subjects/Introduction";
import MeetEducation from "../components/subjects/MeetEducation";
import IDFspirit from "../components/subjects/IDFspirit";
import IDFscroll from "../components/subjects/IDFscroll";
import { useLearningProgress } from "../context/LearningProgressContext";

function Content() {
  const { learningProgress, setLearningProgress } = useLearningProgress();

  const {
    subjNum,
    completedSubjects,
    visitedSubjects,
    subjectPages,
    unlockedPages,
    subjectsProgress,
  } = learningProgress;

  const subjects = [
    {
      key: "introduction",
      name: "מבוא",
      component: Introduction,
      pages: 1,
    },
    {
      key: "meetEducation",
      name: "הכירו את חיל החינוך",
      component: MeetEducation,
      pages: 6,
    },
    {
      key: "idfSpirit",
      name: 'רוח צה"ל',
      component: IDFspirit,
      pages: 10,
    },
    {
      key: "idfScroll",
      name: 'מגילת צה"ל',
      component: IDFscroll,
      pages: 5,
    },
  ];

  const currentSubject = subjects[subjNum];
  const CurrentSubject = currentSubject.component;

  const updateLearningProgress = (changes) => {
    setLearningProgress((prev) => ({
      ...prev,
      ...changes,
    }));
  };

  const changeSubject = (index) => {
    setLearningProgress((prev) => {
      const updatedVisited = [...prev.visitedSubjects];
      updatedVisited[index] = true;

      return {
        ...prev,
        subjNum: index,
        visitedSubjects: updatedVisited,
      };
    });
  };

  const setPageForSubject = (index, page) => {
    setLearningProgress((prev) => {
      const updatedPages = [...prev.subjectPages];
      updatedPages[index] = page;

      return {
        ...prev,
        subjectPages: updatedPages,
      };
    });
  };

  const finishSubject = (index) => {
    setLearningProgress((prev) => {
      const updatedCompleted = [...prev.completedSubjects];
      updatedCompleted[index] = true;

      return {
        ...prev,
        completedSubjects: updatedCompleted,
      };
    });
  };

  const unlockPage = (subjectIndex, pageIndex) => {
    setLearningProgress((prev) => {
      const updatedUnlockedPages = prev.unlockedPages.map((subject) => [
        ...subject,
      ]);

      updatedUnlockedPages[subjectIndex][pageIndex] = true;

      return {
        ...prev,
        unlockedPages: updatedUnlockedPages,
      };
    });
  };

  const updateSubjectProgress = (subjectKey, changes) => {
    setLearningProgress((prev) => {
      const currentProgress = prev.subjectsProgress[subjectKey];

      // טיפול מיוחד בחיל החינוך כי יש שם arraysProgress עמוק
      if (subjectKey === "meetEducation" && changes.arraysProgress) {
        return {
          ...prev,
          subjectsProgress: {
            ...prev.subjectsProgress,
            meetEducation: {
              ...currentProgress,
              ...changes,
              arraysProgress: {
                ...currentProgress.arraysProgress,
                ...changes.arraysProgress,
              },
            },
          },
        };
      }

      return {
        ...prev,
        subjectsProgress: {
          ...prev.subjectsProgress,
          [subjectKey]: {
            ...currentProgress,
            ...changes,
          },
        },
      };
    });
  };

  const goNext = () => {
    const currentPage = subjectPages[subjNum];
    const maxPages = subjects[subjNum].pages;

    if (!unlockedPages[subjNum][currentPage]) {
      return;
    }

    if (currentPage < maxPages - 1) {
      setPageForSubject(subjNum, currentPage + 1);
      return;
    }

    finishSubject(subjNum);

    const next = Math.min(subjNum + 1, subjects.length - 1);

    setLearningProgress((prev) => {
      const updatedVisited = [...prev.visitedSubjects];
      updatedVisited[next] = true;

      const updatedPages = [...prev.subjectPages];
      updatedPages[next] = 0;

      return {
        ...prev,
        subjNum: next,
        visitedSubjects: updatedVisited,
        subjectPages: updatedPages,
      };
    });
  };

  const goBack = () => {
    const currentPage = subjectPages[subjNum];

    if (currentPage > 0) {
      setPageForSubject(subjNum, currentPage - 1);
      return;
    }

    const prevSubject = Math.max(subjNum - 1, 0);

    setLearningProgress((prev) => {
      const updatedPages = [...prev.subjectPages];
      updatedPages[prevSubject] = subjects[prevSubject].pages - 1;

      return {
        ...prev,
        subjNum: prevSubject,
        subjectPages: updatedPages,
      };
    });
  };

  return (
    <div className="content-page">
      <Navbar
        subjNum={subjNum}
        setSubjNum={changeSubject}
        completedSubjects={completedSubjects}
        resetSubjectPage={(index) => setPageForSubject(index, 0)}
        visitedSubjects={visitedSubjects}
      />

      <CurrentSubject
        page={subjectPages[subjNum]}
        setPage={(p) => setPageForSubject(subjNum, p)}
        goNext={goNext}
        goBack={goBack}
        finishSubject={() => finishSubject(subjNum)}
        isNextUnlocked={unlockedPages[subjNum][subjectPages[subjNum]]}
        unlockCurrentPage={() => unlockPage(subjNum, subjectPages[subjNum])}
        progress={subjectsProgress[currentSubject.key]}
        setProgress={(changes) =>
          updateSubjectProgress(currentSubject.key, changes)
        }
      />
    </div>
  );
}

export default Content;
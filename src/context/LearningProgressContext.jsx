import React, { createContext, useContext, useState } from "react";

const LearningProgressContext = createContext(null);

const initialLearningProgress = {
    userDetails: {
        userName: "",
        course: "",
      },
  subjNum: 0,

  completedSubjects: [false, false, false, false],

  visitedSubjects: [true, false, false, false],

  subjectPages: [0, 0, 0, 0],

  unlockedPages: [
    [true], // מבוא
    [true, false, true, true, false, true], // חיל החינוך- 2,5
    [true, false, true, true, true, true, true, true, false, true], // רוח צה"ל 2,9
    [true, false, false, true, true], // מגילת צה"ל 2,3
  ],

  subjectsProgress: {
    introduction: {},

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
    },
  },
};

export function LearningProgressProvider({ children }) {
  const [learningProgress, setLearningProgress] = useState(initialLearningProgress);

  const resetLearningProgress = () => {
    setLearningProgress(initialLearningProgress);
  };

  return (
    <LearningProgressContext.Provider
      value={{
        learningProgress,
        setLearningProgress,
        resetLearningProgress,
      }}
    >
      {children}
    </LearningProgressContext.Provider>
  );
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);

  if (!context) {
    throw new Error(
      "useLearningProgress must be used inside LearningProgressProvider"
    );
  }

  return context;
}
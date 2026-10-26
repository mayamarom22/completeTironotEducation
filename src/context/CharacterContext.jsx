// src/context/CharacterContext.jsx
import { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState("fairy");

  // הקורס שנבחר בתחילת הלומדה
  const [selectedCourse, setSelectedCourse] = useState("");

  // תומך גם ב-"gadna" וגם בשם בעברית כמו "גדנע" / "גדנ״ע"
  const normalizedCourse = selectedCourse.replace(/[״"]/g, "");

  const isGadna =
    selectedCourse === "gadna" ||
    normalizedCourse.includes("גדנע");

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
        selectedCourse,
        setSelectedCourse,
        isGadna,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  return useContext(CharacterContext);
};
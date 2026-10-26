import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { CharacterProvider } from "./context/CharacterContext";
import { LearningProgressProvider } from "./context/LearningProgressContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
    
      <CharacterProvider>
      <LearningProgressProvider>
        <App />
        </LearningProgressProvider>
      </CharacterProvider>
    </HashRouter>
  </StrictMode>
);
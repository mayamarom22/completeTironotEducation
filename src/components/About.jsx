import React from 'react';
import { useState } from "react";

function About() {
    const [showAbout, setShowAbout] = useState(false);

    const toggleAbout = () => setShowAbout((prev) => !prev);
  return (
    <div>
         {/* כפתור אודות */}
         <div>
            <button
              className="about-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleAbout();
              }}
            >
              i
            </button>
          </div>
     {/* אודות */}
     <div
            className={`div-about ${showAbout ? "fade-in show" : "fade-out"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="list-text-about">מפתחת ראשית:</h3>
            <p className="list-text-about">רב"ט מאיה מרום</p>
            <h3 className="list-text-about">גרפיקה:</h3>
            <p className="list-text-about">רב"ט מאיה מרום</p>
            <h3 className="list-text-about">מומחי תוכן:</h3>
            <p className="list-text-about">סמ"ר שחר בלישה</p>
            <p className="list-text-about">סמל סתיו ארגוב</p>
            <h3 className="list-text-about">רמ"ד טי"ל:</h3>
            <p className="list-text-about">רס"מ עדן בן חמו</p>
            <h3 className="list-text-about">גרסה:</h3>
            <p className="list-text-about">מרץ 2026</p>
          </div> 
    </div>
  )
}

export default About

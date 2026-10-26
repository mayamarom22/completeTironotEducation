import React, { useState } from 'react';
import wormImg from "../assets/images/meetEducation/wormImg.png";
import Worm from "../components/Worm";

function Apple({ onBack, openedApple, hodCompleted, setHodCompleted }) {
  const wormDone = hodCompleted;
  const setWormDone = setHodCompleted;

    const textsApple = [
        {
            "title": "תקומה",
            "text": 'מש"ק תקומה ישרת בסביבה אזרחית במטרה לתמוך בילדים ובני נוער מאוכלוסיות שנפגעו במלחמת חרבות ברזל. התפקיד כולל שילוב בבתי ספר ובמרכזים חינוכיים. שם הם מעבירים פעילויות חינוכיות, חברתיות ורגשיות.',
            "id": "tkuma",
        },
        {
            "title": "גשרים",
            "text": 'התפקיד הוקם בשיתוף פעולה עם 8200. מש"ק גשרים עובד עם אוכלוסיה אזרחית בפריפריה במטרה לתת הזדמנות שווה לתלמידים בפריפריה חברתית בתחומי הסייבר והתכנות.',
            "id": "gsharim",
        },
        {
            "title": 'הו"ד',
            "text": 'מש"קיות הוראה והדרכה של חיילים מאוכלוסיות ייחודיות, מטרת התפקיד היא שילוב אוכלוסיות מיוחדות באופן מיטבי בצה"ל ומניעת נשר.',
            "text2": "רוצים לדעת על המגמות השונות?",
            "textWorm": "לחצו על התולעת!",
            "id": "hod",
        },
        {
            "title": 'גדנ"ע',
            "text": 'מפקדי נוער בגדנ"ע יפקדו על מלש"בים למטרת העלאת המוטיבציה בקרב בני נוער לשירות קרבי ולחיזוק עמדות חיוביות לקראת שירותם',
            "id": "gadna",
        },
        {
            "title": "חונכות",
            "text": 'תומכות בשלוב חיילים עם אוטיזם בצה"ל',
            "id": "honhot",
        },
    ]
    const currentApple = textsApple.find(
      (item) => item.id === openedApple
    );
    const isHod = currentApple?.id === "hod";
    const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      <div className='apple-container'>
      <svg width="320" height="610" viewBox="0 0 385 510"  style={{ marginTop: "-110px" }}  fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M198.01 118L199.01 139.99C254.31 125.05 309.7 141.74 340.82 190.68C389.17 266.74 359.77 398.91 273.68 435.16C250.76 444.81 231.99 445.26 207.8 440.69C203.17 439.82 194.92 436.21 191.43 436.05C187.56 435.87 178 439.73 173.19 440.67C24.2499 469.93 -40.3201 225.93 78.6899 152.19C109.96 132.82 146.88 131.15 181.99 139.99C180.91 123.38 176.27 105.86 168.17 91.32C166.19 87.76 156.92 76.37 157.38 73.94C157.8 71.69 176.1 62.13 178.99 61.42C180.14 61.14 180.79 60.65 182.01 61.44C187.65 65.05 193.34 94.89 195.51 102C195.8 102.95 195.68 104.28 196.99 103.99C208.69 69 241.03 44.04 276.8 37.29C282.82 36.15 315.72 31.94 318.57 35.93C318.48 49.52 313.01 64.83 306.18 76.67C285.08 113.26 237.82 127.38 198.02 118H198.01ZM277 42C243.14 45.37 203.93 79.54 199.07 113.92C241.32 123.4 284.86 108.49 305 69C309.05 61.06 313.35 52.1 314 43C314.04 42.4 314.1 41.55 314 41C313.85 40.18 314.29 39.13 313 39C312.34 38.96 311.66 39.05 311 39C309.74 38.9 308.27 38.93 307 39C306.01 39.06 304.98 38.9 304 39C294.96 38.77 285.68 39.26 277 42ZM178.67 66.1C176.58 68.67 162.7 72.36 163.13 75.3C163.66 78.86 173.04 90.92 175.18 95.32C178.5 102.15 183.52 118.07 184.94 125.56C186.22 132.29 183.34 148.44 194.79 141.39C194.59 118.84 192.21 94.06 183.47 73.03C182.72 71.24 180.76 65.9 178.67 66.1ZM132.8 139.3C-42.4701 153.02 4.72989 469.32 172.03 436.53C177.26 435.5 185.87 431.91 190.5 431.91C198.15 431.91 212.95 438.05 222.63 438.86C305.86 445.86 355.96 359.52 359.99 286.48C364.61 202.75 309.26 128.15 219.77 140.26C211.48 141.38 197.21 146.98 190.5 146.99C183.79 147 169.46 141.23 161.38 140.11C152.16 138.84 142.09 138.56 132.8 139.29V139.3Z" fill="#1C1412"/>
<path d="M132.8 139.3C142.09 138.57 152.16 138.85 161.38 140.12C169.46 141.23 184.07 147.01 190.5 147C196.93 146.99 211.48 141.4 219.77 140.27C309.25 128.16 364.61 202.76 359.99 286.49C355.96 359.53 305.86 445.87 222.63 438.87C212.95 438.06 198.15 431.91 190.5 431.92C185.87 431.92 177.27 435.51 172.03 436.54C4.73022 469.32 -42.4698 153.02 132.8 139.3Z" fill="#C6292A"/>
{/* עלה */}
<path d="M307 39C307.41 40.56 310.68 40.5 311 39C311.66 39.05 312.34 38.96 313 39L314 41C314.1 41.55 314.04 42.4 314 43C311.07 42.4 312.21 44.46 311.72 46.17C311.05 48.5 310.75 50.71 309.3 52.8L305 69C284.86 108.48 241.33 123.4 199.07 113.92C203.92 79.54 243.14 45.37 277 42C285.45 41.16 295.16 39.9 304 39C304.98 38.9 306.01 39.06 307 39Z" fill="#3C8C3E"
    onClick={() => {
      if (isHod && !wormDone) return; // 🔒 נעילה רק בהו״ד
      onBack();
    }}
    style={{
      cursor: isHod && !wormDone ? "not-allowed" : "pointer",
      opacity: isHod && !wormDone ? 0.4 : 1
    }}/>
<foreignObject x="200" y="55" width="120" height="50"  pointerEvents="none">
  <div
    xmlns="http://www.w3.org/1999/xhtml"
    style={{
      color: "white",
      fontSize: "20px",
      fontFamily: "rubik-bold",
      textAlign: "center",
      direction: "rtl",
      lineHeight: "1.2",
      pointerEvents: "none",
    }}
  >
    חזרה<br />לעץ
  </div>
</foreignObject>
<path d="M178.67 66.1C180.76 65.9 182.73 71.23 183.47 73.03C192.21 94.06 194.59 118.84 194.79 141.39C183.34 148.44 186.22 132.29 184.94 125.56C183.52 118.07 178.5 102.15 175.18 95.32C173.04 90.92 163.66 78.86 163.13 75.3C162.69 72.36 176.57 68.67 178.67 66.1Z" fill="#53330B"/>
<path d="M314 43C313.35 52.1 309.05 61.06 305 69L309.3 52.8C310.75 50.7 311.05 48.5 311.72 46.17C312.21 44.47 311.07 42.4 314 43Z" fill="#418946"/>
<path d="M304 39C295.16 39.9 285.45 41.16 277 42C285.68 39.26 294.96 38.77 304 39Z" fill="#418946"/>
<path d="M311 39C310.68 40.5 307.41 40.56 307 39C308.27 38.93 309.74 38.9 311 39Z" fill="#418946"/>
<path d="M314 41L313 39C314.29 39.13 313.85 40.18 314 41Z" fill="#418946"/>
{/* כותרת במרכז */}
<text
            x="190" // חצי רוחב התפוח לפי ה-viewBox
            y="180" // מיקום אנכי משוער, אפשר לכוון לפי הצורך
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="28"
            fontFamily='rubik-bold'
            fontWeight="bold"
            fill="white"
          >
            {currentApple?.title}
          </text>

          {/* טקסט נוסף במרכז, מתחת לכותרת */}
          <foreignObject x="65" y="200" width="250" height="200">
  <div
    xmlns="http://www.w3.org/1999/xhtml"
    style={{
      color: "white",
      fontSize: "18px",
      fontFamily: "rubik",
      textAlign: "center",
      lineHeight: "1.4",
    }}
  >
  {currentApple?.text}
  </div>
</foreignObject>
{isHod && (
  <foreignObject x="90" y="330" width="240" height="110">
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style={{
        color: "white",
        textAlign: "center",
        fontSize: "16px",
      }}
    >
      <p className='text-hod'>{currentApple.text2}</p>
      <p className='text-worm'>{currentApple.textWorm}</p>
      <img className='big-worm' src={wormImg}
    onClick={() => setShowPopup(true)}
    style={{ cursor: "pointer" }}
  />

    </div>
  </foreignObject>
)}
</svg>

      </div>
      {showPopup && (
  <div className='overlay'>
    <div className='popup'>
      <p className='popup-hod-text1'>תחת קורס הוד יש 6 מגמות</p>
      <p className='popup-hod-microcopy'>לחצו על המגמות לעוד מידע!</p>
      <Worm onCompleteChange={setWormDone}/>
      <button
  className="close-goal-btn"
  disabled={!wormDone}
  style={{ opacity: wormDone ? 1 : 0.4, pointerEvents: wormDone ? "auto" : "none" }}
  onClick={() => setShowPopup(false)}
>
  סגור
</button>
    </div>
  </div>
)}
    </div>
  )
}

export default Apple

import React from "react";
import "../../css/Content.css";
import nextBtn from "../../assets/images/introduction/nextBtn.png";
import backBtn from "../../assets/images/introduction/backBtn.png";
import meetEduImg from "../../assets/images/introduction/meetEduImg.png";
import IDFspiritImg from "../../assets/images/introduction/IDFspiritImg.png";
import IDFscrollImg from "../../assets/images/introduction/IDFscrollImg.png";


function Introduction({
  page,
  setPage,
  goNext,
  goBack,
  finishSubject
}) {

  const totalPages = 1; // מספר העמודים בנושא

  // const handleNext = () => {
  //   if (page < totalPages - 1) {
  //     setPage(page + 1);
  //   } else {
  //     finishSubject(); // אם זה העמוד האחרון -> מעבר לנושא הבא
  //   }
  // };

  // const handleBack = () => {
  //   if (page > 0) {
  //     setPage(page - 1);
  //   }
  // };

  return (
    <div>

      {page === 0 && (
        <div className="page1 page">
          <p className="title-content">מה נלמד היום?</p>
          <p className="sec-title-content">בלומדה יש שלושה נושאים</p>
          <img src={meetEduImg} alt="meetEduImg" className="meetEduImg" />
          <img src={IDFspiritImg} alt="IDFspiritImg" className="IDFspiritImg" />
          <img src={IDFscrollImg} alt="IDFscrollImg" className="IDFscrollImg" />


        </div>
      )}


      <div className="container-buttons">
      <img
          src={backBtn}
          alt="back"
          className={`backBtn nav-btns ${page === 0 ? "disabled" : ""}`}
          onClick={() => {
            if (page > 0) goBack();
          }}
        />

        <img
          src={nextBtn}
          alt="next"
          className="nextBtn nav-btns"
          onClick={() => goNext()}
        />
      </div>

    </div>
  );
}

export default Introduction;
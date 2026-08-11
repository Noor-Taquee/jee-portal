import "./style.css";

import QuestionBox from "../../../../components/QuestionBox";

/** Panel which shows data of what a `QuestionBox` looks for different states. */
export default function InfoPanel() {
  return (
    <div id="info-panel">
      <div className="question-info-box">
        <QuestionBox
          number={""}
          className="unread"
        />
        <p>Unread</p>
      </div>

      <div className="question-info-box">
        <QuestionBox
          number={""}
          className="answered"
        />
        <p>Answered</p>
      </div>

      <div className="question-info-box">
        <QuestionBox
          number={""}
          className="unanswered"
        />
        <p>Not answered</p>
      </div>

      <div className="question-info-box">
        <QuestionBox
          number={""}
          className="marked-for-review"
        />
        <p>Marked for review</p>
      </div>
    </div>
  );
}

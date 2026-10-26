import "./style.css";

import QuestionBox from "../../../../components/QuestionBox";

/** Panel which shows data of what a `QuestionBox` looks for different states. */
export default function InfoPanel() {
  return (
    <div id="info-panel">
      <div
        className="question-info-box"
        style={{ gridRow: 1, gridColumn: 1 }}
      >
        <QuestionBox
          number={"53"}
          className="unread"
          ariaHidden={true}
        />
        <p>{"Not Visited"}</p>
      </div>

      <div
        className="question-info-box"
        style={{ gridRow: 1, gridColumn: 2 }}
      >
        <QuestionBox
          number={"53"}
          className="answered"
          ariaHidden={true}
        />
        <p>Answered</p>
      </div>

      <div
        className="question-info-box"
        style={{ gridRow: 2, gridColumn: 1 }}
      >
        <QuestionBox
          number={"53"}
          className="unanswered"
          ariaHidden={true}
        />
        <p>{"Not Answered"}</p>
      </div>

      <div
        className="question-info-box"
        style={{ gridRow: 2, gridColumn: 2 }}
      >
        <QuestionBox
          number={"53"}
          className="marked-for-review"
          ariaHidden={true}
        />
        <p>{"Marked for Review"}</p>
      </div>

      <div
        className="question-info-box"
        style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: 3 }}
      >
        <QuestionBox
          number={"53"}
          className="ans-marked-for-review"
          ariaHidden={true}
        />
        <p>
          {"Answered & Marked for review (Will be considered for evaluation)"}
        </p>
      </div>
    </div>
  );
}

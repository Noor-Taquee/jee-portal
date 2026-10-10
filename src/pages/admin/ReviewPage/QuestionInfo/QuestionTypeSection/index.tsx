import "./style.css";

import type { Questions } from "../..";

interface Props {
  question: Questions;
}

export default function QuestionTypeSection({ question }: Props) {
  return (
    <div
      className="review-question-info-section"
      id="question-type-section"
    >
      <h3 className="section-header">Question Type</h3>
      <div className="type-holder">
        <button
          className={`type-button ${question.type === 1 ? "selected" : ""}`}
        >
          <p>MCQ (Single Correct Answer)</p>
        </button>
        <button
          className={`type-button ${question.type === 6 ? "selected" : ""}`}
        >
          <p>Numerical</p>
        </button>
      </div>
    </div>
  );
}

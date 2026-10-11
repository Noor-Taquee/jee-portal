import "./style.css";

import type { Questions } from "../..";

interface Props {
  question: Questions;
}

export default function MCQAnswerSection({ question }: Props) {
  return (
    <div
      className="review-question-info-section"
      id="mcq-answer-section"
    >
      <h3 className="section-header">Answer</h3>
      <div className="options-holder">
        <button
          className={`option ${question.correct_answer === "A" ? "selected" : ""}`}
        >
          <p>A</p>
        </button>
        <button
          className={`option ${question.correct_answer === "B" ? "selected" : ""}`}
        >
          <p>B</p>
        </button>
        <button
          className={`option ${question.correct_answer === "C" ? "selected" : ""}`}
        >
          <p>C</p>
        </button>
        <button
          className={`option ${question.correct_answer === "D" ? "selected" : ""}`}
        >
          <p>D</p>
        </button>
      </div>
    </div>
  );
}

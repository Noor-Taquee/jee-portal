import type { ReviewQuestion, SetQuestion } from "../../index";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function ReviewQuestionTypePopover({
  question,
  setQuestion,
}: Props) {
  return (
    <div
      id="review-question-type-popover"
      className="popover-card down left-level"
      popover="auto"
      style={{ positionAnchor: "--review-question-popover-anchor" }}
    >
      <button
        className="popover-entry"
        onClick={() => {
          setQuestion((current) =>
            current
              ? {
                  ...current,
                  type: 1,
                  options: question.options || ["", "", "", ""],
                  correct_answer: "A",
                  numerical_tolerance: 0,
                }
              : current
          );
        }}
      >
        <p>MCQ (Single Correct Answer)</p>
      </button>
      <button
        className="popover-entry"
        onClick={() => {
          setQuestion((current) =>
            current
              ? {
                  ...current,
                  type: 6,
                  options: null,
                  correct_answer: 0,
                }
              : current
          );
        }}
      >
        <p>Numerical</p>
      </button>
    </div>
  );
}

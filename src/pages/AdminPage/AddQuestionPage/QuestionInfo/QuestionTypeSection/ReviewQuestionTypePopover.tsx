import { useClosePopover } from "../../../../../hooks/useClosePopover";
import type { ReviewQuestion, SetQuestion } from "../../index";
import { CheckIcon } from "lucide-react";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function ReviewQuestionTypePopover({
  question,
  setQuestion,
}: Props) {
  useClosePopover("review-question-type-popover");

  return (
    <div
      popover="auto"
      role="menu"
      id="review-question-type-popover"
      className="popover-card down left-level"
      style={{ positionAnchor: "--review-question-popover-anchor" }}
    >
      <button
        aria-label="MCQ (Single Correct Answer)"
        role="menuitemradio"
        aria-checked={question.type === 1 ? "true" : "false"}
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
        {question.type === 1 && <CheckIcon className="check" />}
      </button>
      <button
        aria-label="Numerical"
        role="menuitemradio"
        aria-checked={question.type === 1 ? "true" : "false"}
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
        {question.type === 6 && <CheckIcon className="check" />}
      </button>
    </div>
  );
}

import "./style.css";

import { ChevronsUpDownIcon } from "lucide-react";
import ReviewQuestionTypePopover from "./ReviewQuestionTypePopover";
import { useReview } from "../../../../../hooks/useReview";

export default function QuestionTypeSection() {
  const { currentQuestion } = useReview();

  if (!currentQuestion) return <div></div>;

  return (
    <div
      className="review-question-info-section"
      id="question-type-section"
    >
      <h4 className="section-header">Question Type</h4>
      <button
        className="type-holder"
        popoverTarget="review-question-type-popover"
        style={{ anchorName: "--review-question-popover-anchor" }}
      >
        <p>
          {currentQuestion.type === 1
            ? "MCQ (Single Correct Answer)"
            : "Numerical"}
        </p>
        <ChevronsUpDownIcon />
      </button>
      <ReviewQuestionTypePopover />
    </div>
  );
}

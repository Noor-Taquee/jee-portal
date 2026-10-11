import "./style.css";

import type { Questions } from "../..";

import { ChevronsUpDownIcon } from "lucide-react";
import ReviewQuestionTypePopover from "./ReviewQuestionTypePopover";

interface Props {
  question: Questions;
}

export default function QuestionTypeSection({ question }: Props) {
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
          {question.type === 1 ? "MCQ (Single Correct Answer)" : "Numerical"}
        </p>
        <ChevronsUpDownIcon />
      </button>
      <ReviewQuestionTypePopover />
    </div>
  );
}

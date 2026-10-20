import "./style.css";

import type { ReviewQuestion, SetQuestion } from "../../index";

import { ChevronsUpDownIcon } from "lucide-react";
import ReviewQuestionTypePopover from "./ReviewQuestionTypePopover";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function QuestionTypeSection({ question, setQuestion }: Props) {
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
      <ReviewQuestionTypePopover
        question={question}
        setQuestion={setQuestion}
      />
    </div>
  );
}

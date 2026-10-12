// oxlint-disable max-lines-per-function

import "./style.css";

import TopicsSection from "./TopicsSection";
import QuestionTypeSection from "./QuestionTypeSection";
import MCQAnswerSection from "./MCQAnswerSection";
import NumericalAnswerSection from "./NumericalAnswerSection";
import { useReview } from "../../../../hooks/useReview";

export default function QuestionInfo() {
  const { currentQuestion } = useReview();

  if (!currentQuestion) return;

  return (
    <div id="review-question-info">
      <QuestionTypeSection />

      <TopicsSection />

      {currentQuestion.type === 1 && <MCQAnswerSection />}

      {currentQuestion.type === 6 && <NumericalAnswerSection />}
    </div>
  );
}

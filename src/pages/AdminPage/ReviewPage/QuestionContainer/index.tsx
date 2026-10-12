import "./style.css";

import QuestionCard from "./QuestionCard";
import OptionsContainer from "./OptionsContainer";
import { useReview } from "../../../../hooks/useReview";

export default function QuestionContainer() {
  const { currentQuestion } = useReview();

  if (!currentQuestion) return <div></div>;

  return (
    <div id="review-question-container">
      <QuestionCard />
      {currentQuestion.type === 1 && <OptionsContainer />}
    </div>
  );
}

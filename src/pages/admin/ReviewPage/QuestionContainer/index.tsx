import "./style.css";

import type { Questions } from "..";

import QuestionCard from "./QuestionCard";
import OptionsContainer from "./OptionsContainer";

interface Props {
  question: Questions;
}

export default function QuestionContainer({ question }: Props) {
  return (
    <div id="review-question-container">
      <QuestionCard question={question.question_text} />
      {question.type === 1 && (
        <OptionsContainer
          options={question.options}
        />
      )}
    </div>
  );
}

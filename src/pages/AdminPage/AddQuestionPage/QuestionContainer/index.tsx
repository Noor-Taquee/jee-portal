import "./style.css";

import type { ReviewQuestion, SetQuestion } from "../index";

import QuestionCard from "./QuestionCard";
import OptionsContainer from "./OptionsContainer";

interface Props {
  question: ReviewQuestion | null;
  setQuestion: SetQuestion;
}

export default function QuestionContainer({ question, setQuestion }: Props) {
  if (!question) return <div></div>;

  return (
    <div id="review-question-container">
      <QuestionCard
        question={question}
        setQuestion={setQuestion}
      />
      {question.type === 1 && (
        <OptionsContainer
          question={question}
          setQuestion={setQuestion}
        />
      )}
    </div>
  );
}

import "./style.css";

import { useState } from "react";

import type { ReviewQuestion, SetQuestion } from "../../index";

import InputArea from "../../../../../components/InputArea";
import InputBox from "../../../../../components/InputBox";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function NumericalAnswerSection({
  question,
  setQuestion,
}: Props) {
  const [newAnswer, setNewAnswer] = useState<number>(
    (question.correct_answer as number) || 0
  );
  const [newNumericalTolerance, setNewNumericalTolerance] = useState(
    question.numerical_tolerance || 0
  );

  if (question.type !== 6) return <div></div>;

  return (
    <div className="review-question-info-section">
      <h4 className="section-header">Answer</h4>
      <InputBox>
        <input
          type="number"
          name="numerical-answer"
          value={question.correct_answer}
          onChange={(e) => {
            setNewAnswer(Number(e.target.value));
          }}
        />
      </InputBox>
      <InputArea
        label="Tolerance"
        error={""}
      >
        <input
          type="number"
          name="tolerance"
          value={question.numerical_tolerance}
          onChange={(e) => {
            setNewNumericalTolerance(Number(e.target.value));
          }}
        />
      </InputArea>

      <button
        className="cta-1 fill"
        onClick={() => {
          setQuestion({
            ...question,
            correct_answer: newAnswer,
            numerical_tolerance: newNumericalTolerance,
          });
        }}
      >
        <p>Save</p>
      </button>
    </div>
  );
}

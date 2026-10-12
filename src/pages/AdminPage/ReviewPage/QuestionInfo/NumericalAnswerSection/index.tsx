// oxlint-disable max-lines-per-function

import "./style.css";

import { useReview } from "../../../../../hooks/useReview";

import InputArea from "../../../../../components/InputArea";
import InputBox from "../../../../../components/InputBox";
import { useState } from "react";

export default function NumericalAnswerSection() {
  const { currentQuestion, updateQuestion } = useReview();

  const [newAnswer, setNewAnswer] = useState<number>(
    (currentQuestion?.correct_answer as number) || 0
  );
  const [newNumericalTolerance, setNewNumericalTolerance] = useState(
    currentQuestion?.numerical_tolerance || 0
  );

  if (!currentQuestion || currentQuestion.type !== 6) return <div></div>;

  return (
    <div className="review-question-info-section">
      <h3 className="section-header">Answer</h3>
      <InputBox>
        <input
          type="number"
          name="numerical-answer"
          value={currentQuestion.correct_answer}
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
          value={currentQuestion.numerical_tolerance}
          onChange={(e) => {
            setNewNumericalTolerance(Number(e.target.value));
          }}
        />
      </InputArea>

      <button
        onClick={() => {
          updateQuestion({
            ...currentQuestion,
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

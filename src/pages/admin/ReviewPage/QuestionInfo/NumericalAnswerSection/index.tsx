import "./style.css";

import type { Questions } from "../..";

import InputArea from "../../../../../components/InputArea";
import InputBox from "../../../../../components/InputBox";

interface Props {
  question: Questions;
}

export default function NumericalAnswerSection({ question }: Props) {
  return (
    <div className="review-question-info-section">
      <h3 className="section-header">Answer</h3>
      <InputBox>
        <input
          type="number"
          name="numerical-answer"
          value={question.correct_answer}
        />
      </InputBox>
      <InputArea
        label="Tolerance"
        error={""}
      >
        <input
          type="number"
          name="tolerance"
          value={0.0}
        />
      </InputArea>
    </div>
  );
}

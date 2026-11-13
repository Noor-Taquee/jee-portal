import "./style.css";

import type { ReviewQuestion, SetQuestion } from "../../index";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function MCQAnswerSection({ question, setQuestion }: Props) {
  if (question.type !== 1) return <div></div>;

  const options = ["A", "B", "C", "D"] as const;

  return (
    <div
      className="review-question-info-section"
      id="mcq-answer-section"
    >
      <h4 className="section-header">Answer</h4>
      <div className="options-holder">
        {options.map((answer) => (
          <button
            className={`option ${question.correct_answer === answer ? "selected" : ""}`}
            onClick={() => {
              setQuestion({
                ...question,
                correct_answer: answer,
              });
            }}
            key={`option-${answer}`}
          >
            <p>{answer}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

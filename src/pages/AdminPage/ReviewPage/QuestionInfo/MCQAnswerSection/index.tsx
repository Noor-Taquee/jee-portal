import { useReview } from "../../../../../hooks/useReview";
import "./style.css";

export default function MCQAnswerSection() {
  const { currentQuestion, updateQuestion } = useReview();

  if (!currentQuestion || currentQuestion.type !== 1) return <div></div>;

  const options: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  return (
    <div
      className="review-question-info-section"
      id="mcq-answer-section"
    >
      <h3 className="section-header">Answer</h3>
      <div className="options-holder">
        {options.map((i) => (
          <button
            className={`option ${currentQuestion.correct_answer === i ? "selected" : ""}`}
            onClick={() => {
              updateQuestion({
                ...currentQuestion,
                correct_answer: i,
              });
            }}
            key={`option-${i}`}
          >
            <p>{i}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

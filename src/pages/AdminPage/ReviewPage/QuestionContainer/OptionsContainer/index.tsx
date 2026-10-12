import "./style.css";

import EditableText from "../EditableText";
import { useReview } from "../../../../../hooks/useReview";

export default function OptionsContainer() {
  const { currentQuestion, updateQuestion } = useReview();

  if (!currentQuestion || !currentQuestion.options) return <div></div>;

  return (
    <div id="review-option-container">
      {currentQuestion.options.map((text, index) => (
        <div
          className="review-option-div"
          key={`${text}-${index}`}
        >
          <EditableText
            text={text}
            onSave={(newText: string) => {
              const newQuestion: typeof currentQuestion = {
                ...currentQuestion,
              };
              newQuestion.options[index] = newText;
              updateQuestion(newQuestion);
            }}
          />
        </div>
      ))}
    </div>
  );
}

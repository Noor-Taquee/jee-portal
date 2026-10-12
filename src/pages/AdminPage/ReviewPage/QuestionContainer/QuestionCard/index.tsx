import "./style.css";

import { useReview } from "../../../../../hooks/useReview";

import EditableText from "../EditableText";

export default function QuestionCard() {
  const { currentQuestion, updateQuestion } = useReview();

  if (!currentQuestion) return <div></div>;

  return (
    <div id="review-question-card">
      <EditableText
        text={currentQuestion.question_text}
        onSave={(newText: string) => {
          const newQuestion: typeof currentQuestion = {
            ...currentQuestion,
            question_text: newText,
          };
          updateQuestion(newQuestion);
        }}
      />
    </div>
  );
}

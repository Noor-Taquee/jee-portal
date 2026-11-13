import "./style.css";

import type { ReviewQuestion, SetQuestion } from "../../index";

import EditableText from "../../../../../components/EditableText";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function QuestionCard({ question, setQuestion }: Props) {
  return (
    <div id="review-question-card">
      <EditableText
        text={question.question_text}
        onSave={(newText: string) => {
          setQuestion((current) =>
            current ? { ...current, question_text: newText } : current
          );
        }}
      />
    </div>
  );
}

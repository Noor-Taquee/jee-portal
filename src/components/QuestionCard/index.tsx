import "./style.css";

import TextRenderer from "../TextRenderer";
import { useNavigate } from "react-router-dom";

interface Props {
  question: {
    id: number;
    type: number;
    question_text: string;
    attempts_count: number;
    exams: {
      id: number;
      name: string;
      exam_type: string;
      date: string;
    }[];
  };
}

export default function QuestionCard({ question }: Props) {
  const navigate = useNavigate();

  const exam = question.exams[0];

  if (!exam) return;

  return (
    <article
      className="question-search-card"
      onClick={() => {
        navigate(`/question/${question.id}`);
      }}
    >
      <header>
        <div className="exam-info">
          <p className="question-id">{question.id}</p>
          <p className="exam">{exam.name}</p>
        </div>
        <p className="type">
          {question.type === 1 && "MCQ (Single Correct Answer)"}
          {question.type === 6 && "Numerical Value Question"}
          <span className="attempts">
            · {question.attempts_count}{" "}
            {question.attempts_count === 1 ? "attempt" : "attempts"}
          </span>
        </p>
      </header>

      <div>
        <TextRenderer content={question.question_text} />
      </div>
    </article>
  );
}

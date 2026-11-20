import "./style.css";

import TextRenderer from "../../../../../components/TextRenderer";

interface Props {
  searchQuestion: {
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

export default function QuestionSearchCard({ searchQuestion }: Props) {
  const exam = searchQuestion.exams[0];

  if (!exam) return;

  return (
    <article className="question-search-card">
      <header>
        <div className="exam-info">
          <p className="question-id">{searchQuestion.id}</p>
          <p className="exam">{exam.name}</p>
        </div>
        <p className="type">
          {searchQuestion.type === 1 && "MCQ (Single Correct Answer)"}
          {searchQuestion.type === 6 && "Numerical Value Question"}
          <span className="attempts">
            · {searchQuestion.attempts_count}{" "}
            {searchQuestion.attempts_count === 1 ? "attempt" : "attempts"}
          </span>
        </p>
      </header>

      <div>
        <TextRenderer content={searchQuestion.question_text} />
      </div>
    </article>
  );
}

import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import QuestionLoading from "./QuestionLoading";
import QuestionError from "./QuestionError";
import QuestionContainer from "../../components/QuestionContainer";
import { parseQuestion } from "../../utils/parseQuestion";

type Result = {
  question: {
    id: number;
    type: number;
    question_text: string;
    options: [string, string, string, string] | null;
    correct_answer: number | "A" | "B" | "C" | "D";
    numerical_tolerance: number;
    explanation: string;
    attempts_count: number;
    correct_attempts_count: number;
    rate_sum: number;
    rate_count: number;
    created_at: string;
  };
};

export default function QuestionPage() {
  const { questionId } = useParams();
  const { loading, result, error } = useFetch<Result>(
    `/api/jee/search/question/byId?questionId=${questionId}`
  );

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (loading) {
    return <QuestionLoading />;
  }

  const question = parseQuestion(result?.question);

  if (error || !result || !question) return <QuestionError />;

  return (
    <div
      id="question-page"
      className="app-panel"
    >
      <header>
        <strong>{question.type.name}</strong>
      </header>
      <QuestionContainer
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        question={question}
      />
      <div>
        <button>
          <p>Check answer</p>
        </button>
      </div>
    </div>
  );
}

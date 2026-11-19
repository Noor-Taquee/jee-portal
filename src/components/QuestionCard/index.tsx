import "./style.css";

import { useState } from "react";
import TextRenderer from "../TextRenderer";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

export type SearchQuestion = {
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
}

interface Props {
  question: SearchQuestion;
}

export default function QuestionCard({ question }: Props) {
  const [rawText, setRawText] = useState(false);

  const navigate = useNavigate();




  return (
    <article
      tabIndex={0}
      role="link"
      className="question-search-card"
      onClick={() => {
        navigate(`/question/${question.id}`);
      }}
    >
      <Header
        question={question}
        setRawText={setRawText}
      />

      <div>
        {rawText ? (
          <p>{question.question_text}</p>
        ) : (
          <TextRenderer content={question.question_text} />
        )}
      </div>

      <Footer question={question} />
    </article>
  );
}

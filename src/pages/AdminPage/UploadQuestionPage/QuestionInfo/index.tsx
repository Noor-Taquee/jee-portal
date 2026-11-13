import "./style.css";

import type { ReviewQuestion, SetQuestion } from "../index";

import { CloudUploadIcon } from "lucide-react";
import TopicsSection from "./TopicsSection";
import QuestionTypeSection from "./QuestionTypeSection";
import MCQAnswerSection from "./MCQAnswerSection";
import NumericalAnswerSection from "./NumericalAnswerSection";
import ExamSection from "./ExamSection";

interface Props {
  question: ReviewQuestion | null;
  setQuestion: SetQuestion;
  setUploadDialoge: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuestionInfo({
  question,
  setQuestion,
  setUploadDialoge,
}: Props) {
  if (!question) return;

  return (
    <div id="review-question-info">
      <ExamSection
        question={question}
        setQuestion={setQuestion}
      />

      <TopicsSection
        question={question}
        setQuestion={setQuestion}
      />

      <QuestionTypeSection
        question={question}
        setQuestion={setQuestion}
      />

      {question.type === 1 && (
        <MCQAnswerSection
          question={question}
          setQuestion={setQuestion}
        />
      )}

      {question.type === 6 && (
        <NumericalAnswerSection
          question={question}
          setQuestion={setQuestion}
        />
      )}

      <button
        id="upload-button"
        className="cta-1 fill"
        onClick={() => {
          setUploadDialoge(true);
        }}
      >
        <CloudUploadIcon />
        <p>Upload</p>
      </button>
    </div>
  );
}

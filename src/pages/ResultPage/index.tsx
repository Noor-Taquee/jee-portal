import "./style.css";

import type { QuestionData } from "../../core/data";
import type { ResponseData } from "../../services";

import { calculateResult } from "../../services/result";

import ResultCard from "./ResultCard";
import ResultQuestionTable from "./ResultQuestionTable";

interface ResultPageProps {
  responseData: ResponseData;
  questionData: QuestionData[] | null;
}

export default function ResultPage({
  responseData,
  questionData,
}: ResultPageProps) {
  if (!questionData) return <div className="app-panel"></div>;

  const resultData = calculateResult(responseData, questionData);

  return (
    <div
      className="app-panel"
      id="result-page"
    >
      <ResultCard resultData={resultData} />
      <ResultQuestionTable resultData={resultData} />
    </div>
  );
}

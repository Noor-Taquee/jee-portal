import "./style.css";

import { useExamSession } from "../../hooks/useExamSession";

import { changeHash } from "../../hooks/useHash";
import { calculateResult } from "../../services/result";

import ResultCard from "./ResultCard";
import ResultQuestionTable from "./ResultQuestionTable";

export default function ResultPage() {
  const examSession = useExamSession();

  if (!examSession.examData || !examSession.candidateResponse) {
    changeHash("login");
    return <div className="app-panel"></div>;
  }

  const resultData = calculateResult(
    examSession.candidateResponse,
    examSession.examData.questions
  );

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

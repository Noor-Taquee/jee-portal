import "./style.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamSession } from "../../hooks/useExamSession";

import { getResult } from "../../core/result";

import ResultCard from "./ResultCard";
import ResultQuestionTable from "./ResultQuestionTable";

export default function ResultPage() {
  const examSession = useExamSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!examSession.examData || !examSession.candidateResponse) {
      navigate("/login", { replace: true });
    }
  }, [examSession.examData, examSession.candidateResponse, navigate]);

  if (!examSession.examData || !examSession.candidateResponse) {
    return <div className="app-panel"></div>;
  }

  const testResult = getResult(examSession, examSession.candidateResponse);

  return (
    <div
      className="app-panel"
      id="result-page"
    >
      <ResultCard testResult={testResult} />
      <ResultQuestionTable testResult={testResult} />
    </div>
  );
}

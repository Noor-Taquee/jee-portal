import "./style.css";

import type { ResultMarks, TestResult } from "../../../core/result";

import ResultSubjectTable from "./ResultSubjectTable";
import SubjectChart from "./SubjectChart";
import MarksBar from "./MarksBar";

interface Props {
  testResult: TestResult;
}

export default function ResultCard({ testResult }: Props) {
  const marks: ResultMarks = [
    testResult.subjectScores.physics,
    testResult.subjectScores.chemistry,
    testResult.subjectScores.maths,
    testResult.totalMarks,
  ];

  return (
    <div id="result-card">
      <ResultSubjectTable marks={marks} />
      <SubjectChart marks={marks} />
      <MarksBar marks={marks} />
    </div>
  );
}

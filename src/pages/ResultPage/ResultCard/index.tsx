import { calculateMarks, type ResultData } from "../../../services/result";
import "./style.css";

import ResultSubjectTable from "./ResultSubjectTable";
import SubjectChart from "./SubjectChart";
import MarksBar from "./MarksBar";

interface ResultCardProps {
  resultData: ResultData;
}

export default function ResultCard({ resultData }: ResultCardProps) {
  const marks = calculateMarks(resultData);

  return (
    <div id="result-card">
      <ResultSubjectTable marks={marks} />
      <SubjectChart marks={marks} />
      <MarksBar marks={marks} />
    </div>
  );
}

import "./style.css";

import type { ResultData } from "../../../services/result";

import VerticalTable from "../../../components/VerticalTable";
import TableRow from "./TableRow";

interface ResultQuestionTableProps {
  resultData: ResultData;
}

export default function ResultQuestionTable({
  resultData,
}: ResultQuestionTableProps) {
  return (
    <div id="result-question-table-wrapper">
      <VerticalTable id="result-question-table">
        <div className="result-question-table-row table-row table-header">
          <span className="s-no-col table-col">S no</span>
          <span className="status-col table-col">Status</span>
          <span className="submitted-col table-col">Submitted Answer</span>
          <span className="correct-col table-col">Correct Answer</span>
          <span className="marks-col table-col">Marks</span>
        </div>
        {resultData.map((answerResult) => (
          <TableRow
            answerResult={answerResult}
            key={`result-${answerResult.id}`}
          />
        ))}
      </VerticalTable>
    </div>
  );
}

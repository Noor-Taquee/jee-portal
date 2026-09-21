import "./style.css";

import type { TestResult } from "../../../core/result";

import VerticalTable from "../../../components/VerticalTable";
import TableRow from "./TableRow";

interface Props {
  testResult: TestResult;
}

export default function ResultQuestionTable({ testResult }: Props) {
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
        {testResult.responses.map((answerResult) => (
          <TableRow
            answerResult={answerResult}
            key={`result-${answerResult.id}`}
          />
        ))}
      </VerticalTable>
    </div>
  );
}

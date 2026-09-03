import type { AnswerResult } from "../../../services/result";

interface TableRowProps {
  answerResult: AnswerResult;
}

export default function TableRow({ answerResult }: TableRowProps) {
  return (
    <div className="result-question-table-row table-row">
      <span className="s-no-col table-col">{answerResult.id}</span>
      <span className="status-col table-col">
        {answerResult.status === "cor" && "Correct"}
        {answerResult.status === "inc" && "Wrong"}
        {answerResult.status === "na" && "Not Attempted"}
      </span>
      <span className="submitted-col table-col">
        {answerResult.submittedAnswer}
      </span>
      <span className="correct-col table-col">
        {answerResult.correctAnswer}
      </span>
      <span className={`marks-col table-col ${answerResult.status}`}>
        {answerResult.marks}
      </span>
    </div>
  );
}

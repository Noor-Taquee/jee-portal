import "./style.css";

import type { TestResult } from "../../../core/result";

interface Props {
  testResult: TestResult;
}

export default function ResultQuestionTable({ testResult }: Props) {
  return (
    <div id="result-question-table-wrapper">
      <table
        id="result-question-table"
        className="vertical-table"
      >
        <thead>
          <tr>
            <th className="col-s-no">
              <p>S no</p>
            </th>
            <th className="col-status">
              <p>Status</p>
            </th>
            <th className="col-submitted">
              <p>Submitted Answer</p>
            </th>
            <th className="col-submitted">
              <p>Correct Answer</p>
            </th>
            <th className="col-marks">
              <p>Marks</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {testResult.responses.map((answerResult) => (
            <tr key={`result-${answerResult.id}`}>
              <td className="col-s-no">
                <p>{answerResult.id}</p>
              </td>
              <td className="col-status">
                <p>
                  {answerResult.status === "cor" && "Correct"}
                  {answerResult.status === "inc" && "Wrong"}
                  {answerResult.status === "na" && "Not Attempted"}
                </p>
              </td>
              <td className="col-submitted">
                <p>{answerResult.submittedAnswer}</p>
              </td>
              <td className="col-submitted">
                <p>{answerResult.correctAnswer}</p>
              </td>
              <td className="col-marks">
                <p>{answerResult.marks}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

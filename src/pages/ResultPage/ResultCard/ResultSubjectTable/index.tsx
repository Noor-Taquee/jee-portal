// oxlint-disable max-lines-per-function

import "./style.css";

import type { ResultMarks } from "../../../../core/result";

interface ResultSubjectTableProps {
  marks: ResultMarks;
}

export default function ResultSubjectTable({ marks }: ResultSubjectTableProps) {
  let [p, c, m, totalMarks] = marks;

  return (
    <table
      id="result-subject-table"
      className="vertical-table"
    >
      <thead>
        <tr className="subject-col">
          <th className="subject-col">
            <p>Subject</p>
          </th>
          <th className="obtained-col">
            <p>Marks Obtained</p>
          </th>
          <th className="maximum-col">
            <p>Maximium Marks</p>
          </th>
          <th className="percentage-col">
            <p>Percentage</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="subject-col">
            <p>Physics</p>
          </td>
          <td className="obtained-col">
            <p>{p}</p>
          </td>
          <td className="maximum-col">
            <p>{100}</p>
          </td>
          <td className="percentage-col">
            <p>{p}.00%</p>
          </td>
        </tr>
        <tr>
          <td className="subject-col">
            <p>Chemistry</p>
          </td>
          <td className="obtained-col">
            <p>{c}</p>
          </td>
          <td className="maximum-col">
            <p>{100}</p>
          </td>
          <td className="percentage-col">
            <p>{c}.00%</p>
          </td>
        </tr>
        <tr>
          <td className="subject-col">
            <p>Maths</p>
          </td>
          <td className="obtained-col">
            <p>{m}</p>
          </td>
          <td className="maximum-col">
            <p>{100}</p>
          </td>
          <td className="percentage-col">
            <p>{m}.00%</p>
          </td>
        </tr>
        <tr className="footer">
          <td className="subject-col">
            <p>Total</p>
          </td>
          <td className="obtained-col">
            <p>{totalMarks}</p>
          </td>
          <td className="maximum-col">
            <p>{300}</p>
          </td>
          <td className="percentage-col">
            <p>{(totalMarks / 3).toFixed(2)}%</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

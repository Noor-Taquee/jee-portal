import "./style.css";

import type { ResultMarks } from "../../../../services/result";

import VerticalTable from "../../../../components/VerticalTable";

interface ResultSubjectTableProps {
  marks: ResultMarks;
}

export default function ResultSubjectTable({ marks }: ResultSubjectTableProps) {
  let [p, c, m, totalMarks] = marks;

  return (
    <VerticalTable id="result-subject-table">
      <div className="table-row table-header">
        <span className="subject-col table-col">Subject</span>
        <span className="obtained-col table-col">Marks Obtained</span>
        <span className="maximum-col table-col">Maximium Marks</span>
        <span className="percentage-col table-col">Percentage</span>
      </div>
      <div className="table-row">
        <span className="subject-col table-col">Physics</span>
        <span className="obtained-col table-col">{p}</span>
        <span className="maximum-col table-col">{100}</span>
        <span className="percentage-col table-col">{p}.00%</span>
      </div>
      <div className="table-row">
        <span className="subject-col table-col">Chemistry</span>
        <span className="obtained-col table-col">{c}</span>
        <span className="maximum-col table-col">{100}</span>
        <span className="percentage-col table-col">{c}.00%</span>
      </div>
      <div className="table-row">
        <span className="subject-col table-col">Maths</span>
        <span className="obtained-col table-col">{m}</span>
        <span className="maximum-col table-col">{100}</span>
        <span className="percentage-col table-col">{m}.00%</span>
      </div>
      <div className="table-row table-footer">
        <span className="subject-col table-col">Total</span>
        <span className="obtained-col table-col">{totalMarks}</span>
        <span className="maximum-col table-col">{300}</span>
        <span className="percentage-col table-col">
          {(totalMarks / 3).toFixed(2)}%
        </span>
      </div>
    </VerticalTable>
  );
}

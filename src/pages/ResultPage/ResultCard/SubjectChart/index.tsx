import "./style.css";

import type { ResultMarks } from "../../../../services/result";

interface SubjectChartProps {
  marks: ResultMarks;
}

export default function SubjectChart({ marks: resultData }: SubjectChartProps) {
  const [p, c, m, _t] = resultData;
  return (
    <div id="subject-chart">
      <div
        className="pie-chart"
        style={{ "--max": `${(p * 18) / 5 || 1}deg` } as React.CSSProperties}
      ></div>
      <div
        className="pie-chart"
        style={{ "--max": `${(c * 18) / 5 || 1}deg` } as React.CSSProperties}
      ></div>
      <div
        className="pie-chart"
        style={{ "--max": `${(m * 18) / 5 || 1}deg` } as React.CSSProperties}
      ></div>
    </div>
  );
}

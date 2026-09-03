import "./style.css";

import type { ResultMarks } from "../../../../services/result";

interface MarksBarProps {
  marks: ResultMarks;
}

export default function MarksBar({ marks }: MarksBarProps) {
  return (
    <div id="marks-bar">
      <span
        className="subject-progress"
        style={{ "--width": `${marks[0] / 3}%` } as React.CSSProperties}
      ></span>
      <span
        className="subject-progress"
        style={{ "--width": `${marks[1] / 3}%` } as React.CSSProperties}
      ></span>
      <span
        className="subject-progress"
        style={{ "--width": `${marks[2] / 3}%` } as React.CSSProperties}
      ></span>
    </div>
  );
}

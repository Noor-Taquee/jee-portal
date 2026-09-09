// oxlint-disable max-lines-per-function

import "./style.css";

import { useExamSession } from "../../../hooks/useExamData";

export default function Header() {
  const examSession = useExamSession();

  const metadata = examSession.examData?.metadata;

  return (
    <div id="login-panel-header">
      <div id="info">
        <div className="info-card">
          <p className="label-1">Noor Taquee</p>
          <p
            id="course-label"
            className="label-2"
          >
            B.Tech
          </p>
        </div>
        <div className="info-card">
          <p
            id="shift-label"
            className={`label-2`}
          >
            {metadata && `Shift-${metadata.shift === 1 ? "I" : "II"}`}
          </p>
          <p
            id="date-label"
            className="label-1"
          >
            {metadata && `${metadata.date} ${metadata.month}`}
          </p>
          <p
            id="yaer-label"
            className="label-2"
          >
            {metadata?.year}
          </p>
        </div>
      </div>
      <div id="picture-div">
        <img
          className="login-img"
          alt=""
        />
        <img
          className="login-img"
          alt=""
        />
      </div>
    </div>
  );
}

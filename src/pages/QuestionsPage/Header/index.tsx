import "./style.css";

import InstituteLogo from "../../../components/InstituteLogo";
import ActionBtn from "../../../components/ActionBtn";

import Timer from "./Timer";
import { changeHash } from "../../../hooks/useHash";

interface HeaderProps {
  startTime: Date;

  /** Test Duration in _Milliseconds_ */
  testDuration: number;
}

export default function Header({ startTime, testDuration }: HeaderProps) {
  return (
    <div id="question-panel-header">
      <InstituteLogo />
      <Timer
        startTime={startTime}
        testDuration={testDuration}
      />
      <ActionBtn
        className="submit-btn"
        onClick={() => {
          changeHash("result");
        }}
      >
        <p>Submit</p>
      </ActionBtn>
    </div>
  );
}

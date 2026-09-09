import "./style.css";

import { changeHash } from "../../../hooks/useHash";

import InstituteLogo from "../../../components/InstituteLogo";
import ActionBtn from "../../../components/ActionBtn";

import Timer from "./Timer";

export default function Header() {
  return (
    <div id="question-panel-header">
      <InstituteLogo />
      <Timer />
      <ActionBtn
        title="End test and submit response"
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

import "./style.css";

import InstituteLogo from "../../../components/InstituteLogo";

import Timer from "./Timer";
import SubmitButton from "./SubmitButton";

export default function Header() {
  return (
    <div id="question-panel-header">
      <InstituteLogo />
      <Timer />
      <SubmitButton />
    </div>
  );
}

import InstituteLogo from "../../../components/InstituteLogo";
import "./style.css";

export default function Header() {
  return (
    <div id="question-panel-header">
      <InstituteLogo />
      <p>{"Remaining time: 00:00:00"}</p>
    </div>
  );
}

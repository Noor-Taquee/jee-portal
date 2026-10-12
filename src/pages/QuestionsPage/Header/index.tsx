import "./style.css";

import InstituteLogo from "../../../components/InstituteLogo";

import Timer from "./Timer";
import SubmitButton from "./SubmitButton";

interface Props {
  submitExam: () => void;
}

export default function Header({ submitExam }: Props) {
  return (
    <div id="question-panel-header">
      <InstituteLogo />
      <Timer />
      <SubmitButton submitExam={submitExam} />
    </div>
  );
}

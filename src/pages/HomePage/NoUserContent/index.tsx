import "./style.css";

import ExamCountdown from "../../../components/ExamCountdown";
import RegisterButton from "../../../components/RegisterButton";

export default function NoUserContent() {
  return (
    <div
      className="content-div"
      id="no-user-content"
    >
      <ExamCountdown />
      <RegisterButton />
    </div>
  );
}

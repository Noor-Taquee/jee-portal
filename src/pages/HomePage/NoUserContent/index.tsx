import "./style.css";

import ExamCountdown from "../../../components/ExamCountdown";
import RegisterButton from "../../../components/RegisterButton";
import Footer from "./Footer";

export default function NoUserContent() {
  return (
    <div id="no-user-content">
      <ExamCountdown />
      <RegisterButton />
      <Footer />
    </div>
  );
}

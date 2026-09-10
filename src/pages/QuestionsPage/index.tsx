import "./style.css";

import { changeHash } from "../../hooks/useHash";
import { useExamSession } from "../../hooks/useExamSession";

import QuestionPanel from "./QuestionPanel";
import Header from "./Header";

export default function QuestionsPage() {
  const examSession = useExamSession();

  if (!examSession.startedAt) {
    changeHash("login");
  }

  if (!examSession.examData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="app-panel"
      id="questions-page"
    >
      <Header />
      <QuestionPanel />
    </div>
  );
}

import "./style.css";

import { changeHash } from "../../hooks/useHash";
import { useExamSession } from "../../hooks/useExamSession";

import QuestionPanel from "./QuestionPanel";
import Header from "./Header";

export default function QuestionsPage() {
  const examSession = useExamSession();

  if (!examSession.examData || !examSession.startedAt) {
    return (
      <div
        className="app-panel"
        id="questions-page"
      >
        <div className="dialogue-box">
          <p className="dialogue-header">
            {examSession.examData
              ? "Test has not started yet !"
              : "There is no test scheduled !"}
          </p>
          <p className="dialogue-text">
            {examSession.examData
              ? "Go to the login page to start the test"
              : "Go to the login page to schedule a test"}
          </p>
          <button
            onClick={() => {
              changeHash("login");
            }}
            className="action-btn"
          >
            <p>Back</p>
          </button>
        </div>
      </div>
    );
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

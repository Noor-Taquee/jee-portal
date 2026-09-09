// oxlint-disable max-lines-per-function

import "./app.css";

import { useOrientation } from "./hooks/useOrientation.js";
import { useHash } from "./hooks/useHash.js";
import { useSettings } from "./hooks/useSettings.js";

import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage/index.js";
import ExamProvider from "./context/ExamContext/ExamProvider.js";

export default function App() {
  const appSettings = useSettings();

  let panel = useHash();

  const orientation = useOrientation();

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      <div className="panel-container">
        <ExamProvider>
          {panel === "login" && <LoginPage />}
          {panel === "question" && <QuestionsPage />}
          {panel === "result" && <ResultPage />}
        </ExamProvider>
      </div>
    </div>
  );
}

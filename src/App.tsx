// oxlint-disable max-lines-per-function

import "./app.css";

import { useState } from "react";
import { useOrientation } from "./hooks/useOrientation.js";
import { useHash } from "./hooks/useHash.js";
import { useQuestionData } from "./hooks/useQuestionData.js";
import { useSettings } from "./hooks/useSettings.js";

import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage/index.js";

export default function App() {
  const appSettings = useSettings();
  const [questionData, responseData, setResponseData] = useQuestionData();

  let panel = useHash();

  const [startTime, setStartTime] = useState<Date | undefined>();
  const [testDuration, _setTestDuration] = useState<number>(10800000);

  const orientation = useOrientation();

  return (
    <div
      id="app"
      data-theme={appSettings.theme}
      data-orientation={orientation}
      className={appSettings.simpleMode ? "original-ui" : ""}
    >
      <div className="panel-container">
        {panel === "login" && <LoginPage setStartTime={setStartTime} />}
        {panel === "question" && (
          <QuestionsPage
            testDuration={testDuration}
            startTime={startTime}
            questionData={questionData?.questions}
            responseData={responseData}
            setResponseData={setResponseData}
          />
        )}
        {panel === "result" && (
          <ResultPage
            questionData={questionData?.questions}
            responseData={responseData}
          />
        )}
      </div>
    </div>
  );
}

// oxlint-disable max-lines-per-function

import "./app.css";

import { useState } from "react";
import { useOrientation } from "./hooks/useOrientation.js";
import { useHash } from "./hooks/useHash.js";
import { useQuestionData } from "./hooks/useQuestionData.js";

import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage/index.js";

export default function App() {
  const [questionData, responseData, setResponseData] = useQuestionData();

  let panel = useHash();

  const [startTime, setStartTime] = useState<Date | undefined>();
  const [testDuration, _setTestDuration] = useState<number>(10800000);

  const orientation = useOrientation();

  return (
    <div
      id="app"
      data-theme="light"
      data-orientation={orientation}
    >
      <div className="panel-container">
        {panel === "login" && <LoginPage setStartTime={setStartTime} />}
        {panel === "question" && startTime && (
          <QuestionsPage
            testDuration={testDuration}
            startTime={startTime}
            questionData={questionData}
            responseData={responseData}
            setResponseData={setResponseData}
          />
        )}
        {panel === "result" && (
          <ResultPage
            questionData={questionData}
            responseData={responseData}
          />
        )}
      </div>
    </div>
  );
}

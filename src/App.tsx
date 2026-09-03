// oxlint-disable max-lines-per-function

import "./app.css";

import { useEffect, useState } from "react";
import { useOrientation } from "./hooks/useOrientation.js";
import { useHash } from "./hooks/useHash.js";

import { getQuestions, type QuestionData } from "./core/data";
import type { AnswerResponse, ResponseData } from "./services/index.js";

import LoginPage from "./pages/LoginPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultPage from "./pages/ResultPage/index.js";

export default function App() {
  const [questionData, setQuestionData] = useState<QuestionData[] | null>(null);
  // Response of the candidate
  const [responseData, setResponseData] = useState<ResponseData>(new Map());

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestionData(data.questions);
      setResponseData(
        new Map(
          data.questions.map((question) => {
            const res: [number, AnswerResponse] = [
              question.id,
              {
                type: question.type,
                visited: false,
                answer: null,
                review: false,
                submittedAnswer: null,
              },
            ];
            return res;
          })
        )
      );
    });
  }, []);

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
        {panel === "question" && (
          <QuestionsPage
            testDuration={testDuration}
            startTime={startTime || new Date()}
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

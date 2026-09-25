// oxlint-disable max-lines-per-function
import "./style.css";

import { useRef, useState } from "react";
import { changeHash } from "../../hooks/useHash";
import { useExamSession } from "../../hooks/useExamSession";

import QuestionPanel from "./QuestionPanel";
import Header from "./Header";

export default function QuestionsPage() {
  const examSession = useExamSession();

  const [questionNo, setQuestionNo] = useState<number>(1);

  const questionTimeRef = useRef(new Date());

  function changeQuestionNumber(nextQuestionNo: number) {
    if (nextQuestionNo === questionNo) return;

    const now = new Date();
    const elapsedTime = Math.round(
      (now.getTime() - questionTimeRef.current.getTime()) / 1000
    );

    examSession.setCandidateResponse((prevMap) => {
      if (!prevMap) return prevMap;

      const currentQuestion = prevMap.get(questionNo);
      const targetQuestion = prevMap.get(nextQuestionNo);

      const needsTimeUpdate = currentQuestion && elapsedTime > 0;
      const needsVisitedUpdate = targetQuestion && !targetQuestion.visited;

      if (!needsTimeUpdate && !needsVisitedUpdate) return prevMap;

      const newMap = new Map(prevMap);

      if (needsTimeUpdate) {
        const updatedTime = (currentQuestion.timeTaken || 0) + elapsedTime;

        newMap.set(questionNo, {
          ...currentQuestion,
          timeTaken: updatedTime,
        });
      }

      if (targetQuestion && !targetQuestion.visited) {
        newMap.set(nextQuestionNo, {
          ...targetQuestion,
          visited: true,
        });
      }

      return newMap;
    });

    questionTimeRef.current = now;

    setQuestionNo(nextQuestionNo);
  }

  function submitExam() {
    const now = Date.now();
    const elapsedTime = Math.round(
      (now - questionTimeRef.current.getTime()) / 1000
    );

    // 1. Flush elapsed time for the current active question
    if (elapsedTime > 0) {
      examSession.setCandidateResponse((prevMap) => {
        if (!prevMap) return prevMap;

        const currentQuestion = prevMap.get(questionNo);
        if (!currentQuestion) return prevMap;

        const newMap = new Map(prevMap);
        newMap.set(questionNo, {
          ...currentQuestion,
          timeTaken: (currentQuestion.timeTaken || 0) + elapsedTime,
        });

        return newMap;
      });
    }

    // 2. Mark exam completed and navigate
    examSession.setCompletedAt(new Date());
    changeHash("result");
  }

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
      <Header submitExam={submitExam} />
      <QuestionPanel
        questionNo={questionNo}
        setQuestionNo={changeQuestionNumber}
      />
    </div>
  );
}

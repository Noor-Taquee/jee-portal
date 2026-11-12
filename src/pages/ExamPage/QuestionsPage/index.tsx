import "./style.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamSession } from "../../../hooks/useExamSession";

import { Helmet } from "react-helmet-async";
import QuestionPanel from "./QuestionPanel";
import Header from "./Header";

export default function QuestionsPage() {
  const examSession = useExamSession();
  const navigate = useNavigate();

  const [questionNo, setQuestionNo] = useState<number>(1);

  const questionTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    if (!questionTimeRef.current) {
      questionTimeRef.current = new Date();
    }
  }, []);

  function calculateElapsedTime() {
    if (!questionTimeRef.current) return 0;

    const now = new Date();
    const eleapsedTime = Math.round(
      (now.getTime() - questionTimeRef.current.getTime()) / 1000
    );
    return eleapsedTime;
  }

  function changeQuestionNumber(nextQuestionNo: number) {
    if (nextQuestionNo === questionNo) return;

    const elapsedTime = calculateElapsedTime();

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

    questionTimeRef.current = new Date();

    setQuestionNo(nextQuestionNo);
  }

  function submitExam() {
    const elapsedTime = calculateElapsedTime();

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
    void navigate("/exam/result");
  }

  if (!examSession.examData || !examSession.startedAt) {
    return (
      <div
        className="app-panel"
        id="questions-page"
      >
        <Helmet>
          <meta
            name="robots"
            content="noindex, nofollow"
          />
          <title>Exam - Questions</title>
        </Helmet>

        <div className="dialog-box">
          <p className="dialog-header">
            {examSession.examData
              ? "Test has not started yet !"
              : "There is no test scheduled !"}
          </p>
          <p className="dialog-text">
            {examSession.examData
              ? "Go to the login page to start the test"
              : "Go to the login page to schedule a test"}
          </p>
          <button
            onClick={() => {
              void navigate("/exam/login");
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
      <Helmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
        <title>Exam - Questions</title>
      </Helmet>

      <Header submitExam={submitExam} />
      <QuestionPanel
        questionNo={questionNo}
        setQuestionNo={changeQuestionNumber}
      />
    </div>
  );
}

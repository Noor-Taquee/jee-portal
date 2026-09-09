import "./style.css";

import { useState } from "react";
import { useExamSession } from "../../../hooks/useExamData";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

export default function QuestionPanel() {
  const examSession = useExamSession();

  const [questionNo, setQuestionNo] = useState<number>(1);

  if (!examSession.examData) return <div></div>;

  // Question No

  // Question to be displayed on the screen.
  const question = examSession.examData.questions[questionNo - 1];

  return (
    <div id="question-panel">
      <QuestionContainer
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
        question={question}
      />
      <div id="question-control-panel">
        <InfoPanel />
        <QuestionTable setQuestionNo={setQuestionNo} />
      </div>
    </div>
  );
}

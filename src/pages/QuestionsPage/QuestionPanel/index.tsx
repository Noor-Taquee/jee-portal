import "./style.css";

import { useExamSession } from "../../../hooks/useExamSession";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

interface Props {
  questionNo: number;
  setQuestionNo: (n: number) => void;
}

export default function QuestionPanel({ questionNo, setQuestionNo }: Props) {
  const examSession = useExamSession();

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

import "./style.css";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

interface Props {
  questionNo: number;
  setQuestionNo: (n: number) => void;
}

export default function QuestionPanel({ questionNo, setQuestionNo }: Props) {
  return (
    <div id="question-panel">
      <QuestionContainer
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
      />
      <div id="question-control-panel">
        <InfoPanel />
        <QuestionTable setQuestionNo={setQuestionNo} />
      </div>
    </div>
  );
}

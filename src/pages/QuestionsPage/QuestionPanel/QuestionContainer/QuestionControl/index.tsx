// oxlint-disable max-lines-per-function

import type { OptionID } from "../../../../../core/data";

import "./style.css";

import AMFRBtn from "./AMFRBtn";
import ClearBtn from "./ClearBtn";
import MFRBtn from "./MFRBtn";
import PreviousBtn from "./PreviousBtn";
import SaveBtn from "./SaveBtn";

interface QuestionControlProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  answer: OptionID | OptionID[] | null;
  setAnswer: React.Dispatch<React.SetStateAction<string | string[] | null>>;
}

export default function QuestionControl({
  questionNo,
  setQuestionNo,
  answer,
  setAnswer,
}: QuestionControlProps) {
  return (
    <div id="question-control">
      <PreviousBtn
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
      />
      <div id="separator-div">
        <ClearBtn
          questionNo={questionNo}
          setAnswer={setAnswer}
        />
        <AMFRBtn
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          answer={answer}
        />
        <MFRBtn
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          answer={answer}
        />
        <SaveBtn
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          answer={answer}
        />
      </div>
    </div>
  );
}

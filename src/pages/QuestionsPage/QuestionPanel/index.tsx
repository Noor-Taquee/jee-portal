// oxlint-disable max-lines-per-function

import { useState } from "react";

import type { QuestionData } from "../../../core/data";
import type { ResponseData } from "../../../services";
import type { InnerRoute } from "../../../utils/hash-handler";

import "./style.css";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

interface MainProps {
  questionData: QuestionData[];
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;

  route?: InnerRoute;
}

export default function QuestionPanel({
  questionData,
  responseData,
  setResponseData,
}: MainProps) {
  // Question No
  const [questionNo, setQuestionNo] = useState<number>(1);

  // Question to be displayed on the screen.
  const question = questionData[questionNo - 1];

  return (
    <div id="question-panel">
      <QuestionContainer
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
        question={question}
        responseData={responseData}
        setResponseData={setResponseData}
      />
      <div id="question-control-panel">
        <InfoPanel />
        <QuestionTable
          responseData={responseData}
          setQuestionNo={setQuestionNo}
        />
      </div>
    </div>
  );
}

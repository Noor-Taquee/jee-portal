// oxlint-disable max-lines-per-function

import { useState, useEffect } from "react";

import type { QuestionData } from "../../../core/data";
import type { AnswerResponse, ResponseData } from "../../../services";
import type { InnerRoute } from "../../../utils/hash-handler";

import "./style.css";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

interface MainProps {
  questionData: QuestionData[];
}

export default function QuestionPanel({ questionData, route }: MainProps) {
  // Response of the candidate
  const [responseData, setResponseData] = useState<ResponseData>(
    new Map(
      questionData.map((i) => {
        const res: [number, AnswerResponse] = [
          i.id,
          {
            type: i.type,
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

  // Question No
  const [questionNo, setQuestionNo] = useState<number>(1);

  // Question to be displayed on the screen.
  let question = questionData[questionNo - 1];
  useEffect(
    () => (question = questionData[questionNo - 1]),
    [questionData, questionNo]
  );

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

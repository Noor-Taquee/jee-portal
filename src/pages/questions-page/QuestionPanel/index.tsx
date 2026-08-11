import { useState, useEffect } from "react";

import type { QuestionData } from "../../../core/data";
import type { AnswerResponse, ResponseData } from "../../../services";
import type { InnerRoute } from "../../../utils/hash-handler";

import "./style.css";

import InfoPanel from "./InfoPanel";
import QuestionContainer from "./QuestionContainer";
import QuestionTable from "./QuestionTable";

interface MainProps {
  route: InnerRoute;
  questionData: QuestionData[];
}

export default function QuestionPanel({ questionData, route }: MainProps) {
  // Response of the candidate
  const [responseData, _setResponseData] = useState<ResponseData>(
    new Map(
      questionData.map((i) => {
        const res: [number, AnswerResponse] = [
          i.index,
          { visited: false, option: null, review: false },
        ];
        return res;
      })
    )
  );

  // Question No
  const [questionNo, setQuestionNo] = useState<number>(1);
  useEffect(() => {
    const attributes = route[1];
    for (let attr of attributes) {
      const [key, value] = attr.split("=");
      if (key && value && key === "question") {
        const num = Number(value);
        if (num > 0 && num < 76) setQuestionNo(num);
        else setQuestionNo((p) => p);
      }
    }
  }, [route]);

  // MARK: get question
  // Question to be displayed on the screen.
  const [question, setQuestion] = useState<QuestionData | null>(null);
  useEffect(() => {
    const que = questionData[questionNo - 1];
    if (!que) setQuestion(null);
    else setQuestion(que);
  }, [questionNo]);

  return (
    <div id="question-panel">
      <QuestionContainer question={question} />
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

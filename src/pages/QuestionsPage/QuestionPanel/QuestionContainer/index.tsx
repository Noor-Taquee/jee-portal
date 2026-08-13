import { useEffect, useState } from "react";

import type { QuestionData } from "../../../../core/data";
import type { ResponseData } from "../../../../services";

import "./style.css";

import QuestionDiv from "./QuestionDiv";
import OptionsContainer from "./OptionsContainer";
import QuestionControl from "./QuestionControl";

interface QuestionContainerProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  question: QuestionData | null;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

/** Question container */
export default function QuestionContainer({
  questionNo,
  setQuestionNo,
  question,
  responseData,
  setResponseData,
}: QuestionContainerProps) {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3 | 4 | null>(
    null
  );
  useEffect(() => {
    const s = responseData.get(questionNo);
    if (!s) return;
    setSelectedOption(s.option);
  }, [questionNo, responseData]);

  if (!question) return <div id="question-container"></div>;

  return (
    <div id="question-container">
      <QuestionDiv
        index={question.index}
        content={question.question}
      />
      <OptionsContainer
        selectedOption={selectedOption}
        options={question.options}
        setOption={setSelectedOption}
      />
      <QuestionControl
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
        selectedOption={selectedOption}
        responseData={responseData}
        setResponseData={setResponseData}
      />
    </div>
  );
}

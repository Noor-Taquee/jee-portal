// oxlint-disable max-lines-per-function

import { useEffect, useState } from "react";

import type { OptionID, QuestionData } from "../../../../core/data";
import type { ResponseData } from "../../../../services";

import "./style.css";

import QuestionCard from "./QuestionCard";
import OptionsContainer from "./OptionsContainer";
import QuestionControl from "./QuestionControl";
import Numpad from "../../../../components/Numpad";
import Header from "./Header";

interface QuestionContainerProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  question: QuestionData | undefined;
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
  const [answer, setAnswer] = useState<string | string[] | null>(null);
  useEffect(() => {
    const s = responseData.get(questionNo);
    if (!s) return;
    setAnswer(s.answer);
  }, [questionNo, responseData]);

  if (!question) return <div id="question-container"></div>;

  return (
    <div id="question-container">
      <Header question={question} />
      <div id="question-area">
        <QuestionCard
          index={question.id}
          content={question.question}
        />
        {question.type === "single-choice" && (
          <OptionsContainer
            selectedOption={answer as OptionID}
            options={question.options}
            setOption={
              setAnswer as React.Dispatch<React.SetStateAction<OptionID | null>>
            }
          />
        )}
        {question.type === "numerical" && (
          <Numpad
            answer={answer as string}
            setAnswer={setAnswer}
          />
        )}
      </div>
      <QuestionControl
        questionNo={questionNo}
        setQuestionNo={setQuestionNo}
        answer={answer as OptionID | null}
        setAnswer={setAnswer}
        responseData={responseData}
        setResponseData={setResponseData}
      />
    </div>
  );
}

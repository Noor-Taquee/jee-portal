// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";
import { useSettings } from "../../../../hooks/useSettings";
import { useExamSession } from "../../../../hooks/useExamSession";

import type { OptionID, QuestionData } from "../../../../core/data";

import QuestionCard from "./QuestionCard";
import OptionsContainer from "./OptionsContainer";
import QuestionControl from "./QuestionControl";
import Numpad from "../../../../components/Numpad";
import Header from "./Header";

interface QuestionContainerProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  question: QuestionData | undefined;
}

/** Question container */
export default function QuestionContainer({
  questionNo,
  setQuestionNo,
  question,
}: QuestionContainerProps) {
  const appSettings = useSettings();
  const examSession = useExamSession();

  const [answer, setAnswer] = useState<string | string[] | null>(
    examSession.candidateResponse?.get(questionNo)?.answer || null
  );

  if (!examSession.candidateResponse) return <div></div>;

  if (!question) return <div id="question-container"></div>;

  return (
    <div
      id="question-container"
      style={
        { "--text-size": `${appSettings.textSize}px` } as React.CSSProperties
      }
    >
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
      />
    </div>
  );
}

import { useState } from "react";
import type { QuestionData } from "../../../../core/data";

import "./style.css";

import QuestionDiv from "./QuestionDiv";
import OptionsContainer from "./OptionsContainer";

interface QuestionContainerProps {
  question: QuestionData | null;
}

/** Question container */
export default function QuestionContainer({
  question,
}: QuestionContainerProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

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
    </div>
  );
}

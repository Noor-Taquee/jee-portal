import "./style.css";

import type {
  AppCompatibleQuestion,
  OptionId,
  QuestionOptions,
} from "../../utils/parseQuestion";
import Numpad from "./Numpad";
import OptionsContainer from "./OptionsContainer";
import QuestionCard from "./QuestionCard";

interface Props {
  selectedAnswer: AppCompatibleQuestion["correct_answer"] | null;
  setSelectedAnswer: React.Dispatch<
    React.SetStateAction<Props["selectedAnswer"]>
  >;
  question: AppCompatibleQuestion;
}

export default function QuestionContainer({
  question,
  selectedAnswer,
  setSelectedAnswer,
}: Props) {
  return (
    <div id="question-container">
      <QuestionCard content={question.question_text} />
      {question.type.slug === "mcq" && (
        <OptionsContainer
          options={question.options as QuestionOptions}
          selectedOption={selectedAnswer as OptionId | null}
          setSelectedOption={setSelectedAnswer}
        />
      )}
      {question.type.slug === "numerical" && (
        <Numpad
          selectedAnswer={selectedAnswer as string | null}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}
    </div>
  );
}

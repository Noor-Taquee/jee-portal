import "./style.css";

import OptionDiv from "./OptionDiv";
import type { OptionId, QuestionOptions } from "../../../utils/parseQuestion";

interface Props {
  options: QuestionOptions;
  selectedOption: OptionId | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<string | OptionId | null>
  >;
}

/** Options container for MCQ type questions.  */
export default function OptionsContainer({
  options,
  selectedOption,
  setSelectedOption,
}: Props) {
  if (!options) return <p>No options</p>;

  return (
    <div id="options-container">
      {options.map((option) => (
        <OptionDiv
          selected={selectedOption === option.id}
          option={option}
          setSelectedOption={setSelectedOption}
          key={option.id}
        />
      ))}
    </div>
  );
}

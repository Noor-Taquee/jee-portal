import type { OptionData } from "../../../../../core/question";

import "./style.css";

import OptionDiv from "./OptionDiv";
import type { OptionID } from "../../../../../core/question";

interface OptionsContainerProps {
  options: OptionData[];
  selectedOption: OptionID | null;
  setOption: React.Dispatch<React.SetStateAction<OptionID | null>>;
}

/** Options container for MCQ type questions.  */
export default function OptionsContainer({
  options,
  selectedOption,
  setOption,
}: OptionsContainerProps) {
  return (
    <div id="options-container">
      {options.map((o) => (
        <OptionDiv
          selected={selectedOption === o.id}
          option={o}
          setOption={setOption}
          key={o.id}
        />
      ))}
    </div>
  );
}

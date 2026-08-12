import type { OptionData } from "../../../../../core/data";

import "./style.css";

import OptionDiv from "./OptionDiv";

interface OptionsContainerProps {
  options: OptionData[];
  selectedOption: number | null;
  setOption: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | null>>;
}

/** Options container  */
export default function OptionsContainer({
  options,
  selectedOption,
  setOption,
}: OptionsContainerProps) {
  return (
    <div id="options-container">
      {options.map((o, i) => (
        <OptionDiv
          selected={selectedOption === i + 1}
          content={o}
          setOption={setOption}
          key={o.index}
        />
      ))}
    </div>
  );
}

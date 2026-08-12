import type { OptionData } from "../../../../../../core/data";

import "./style.css";

import TextContent from "../../TextContent";

interface OptionDivProps {
  content: OptionData;
  selected: boolean;
  setOption: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | null>>;
}

export default function OptionDiv({
  content,
  selected,
  setOption,
}: OptionDivProps) {
  return (
    <div className="option-div">
      <div
        className={`option-radio ${selected ? "selected" : ""}`}
        onClick={() => setOption(content.index)}
      ></div>
      <TextContent content={content.value} />
    </div>
  );
}

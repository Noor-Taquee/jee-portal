import type { OptionData, OptionID } from "../../../../../../../core/question";

import "./style.css";

import TextRenderer from "../../../../../../../components/TextRenderer";

interface OptionDivProps {
  option: OptionData;
  selected: boolean;
  setOption: React.Dispatch<React.SetStateAction<OptionID | null>>;
}

export default function OptionDiv({
  option,
  selected,
  setOption,
}: OptionDivProps) {
  return (
    <div
      role="menu"
      className="option-div"
    >
      <button
        role="menuitemradio"
        aria-checked={selected ? "true" : "false"}
        className={`option-radio ${selected ? "selected" : ""}`}
        onClick={() => {
          setOption(option.id);
        }}
      ></div>
      <TextRenderer content={option.content} />
    </div>
  );
}

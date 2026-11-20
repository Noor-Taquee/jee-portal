import "./style.css";

import TextRenderer from "../../../../components/TextRenderer";
import type { OptionId, QuestionOption } from "../../../../utils/parseQuestion";

interface Props {
  selected: boolean;
  option: QuestionOption;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<string | OptionId | null>
  >;
}

export default function OptionDiv({
  option,
  selected,
  setSelectedOption,
}: Props) {
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
          setSelectedOption(option.id);
        }}
      ></button>
      <TextRenderer content={option.content} />
    </div>
  );
}

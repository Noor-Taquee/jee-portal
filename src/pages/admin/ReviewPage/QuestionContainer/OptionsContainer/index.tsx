import "./style.css";

import EditableText from "../EditableText";

interface Props {
  options: string[];
}

export default function OptionsContainer({
  options }: Props) {
  return (
    <div id="review-option-container">
      {options.map((text, index) => (
        <div
          className="review-option-div"
          key={`${text}-${index}`}
        >
          <EditableText question={text} />
        </div>
      ))}
    </div>
  );
}

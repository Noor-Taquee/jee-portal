import "./style.css";

interface QuestionBoxProps {
  number: number | string;
  className:
    | "unread"
    | "answered"
    | "unanswered"
    | "marked-for-review"
    | "ans-marked-for-review";
  onClick?: () => void;
  ariaHidden?: true;
}

/** Box surrounding the question number in `QuestionTable` */
export default function QuestionBox({
  number,
  className,
  onClick,
  ariaHidden,
}: QuestionBoxProps) {
  number = String(number).length === 1 ? `0${number}` : number;

  return (
    <button
      className={`question-box ${className}`}
      onClick={onClick}
      aria-hidden={ariaHidden ? "true" : "false"}
    >
      {className === "ans-marked-for-review" && (
        <i className="ph-bold ph-article"></i>
      )}
      <p>{number}</p>
    </button>
  );
}

import "./style.css";

interface QuestionBoxProps {
  number: number | string;
  className: "unread" | "answered" | "unanswered" | "marked-for-review";
  onClick?: () => void;
}

export default function QuestionBox({
  number,
  className,
  onClick,
}: QuestionBoxProps) {
  return (
    <div
      className={`question-box ${className}`}
      onClick={onClick}
    >
      <p>{number}</p>
    </div>
  );
}

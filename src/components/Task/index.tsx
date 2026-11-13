import "./style.css";

import { CheckIcon } from "lucide-react";

interface Props {
  header: string;
  description: string;
  checked: boolean;
  onCheck: () => void;
  onUncheck: () => void;
}

export default function Task({
  header,
  description,
  checked,
  onCheck,
  onUncheck,
}: Props) {
  return (
    <div
      role="menuitemcheckbox"
      className="review-task"
    >
      <button
        className={`checkbox ${checked ? "checked" : ""}`}
        role="checkbox"
        aria-checked={checked}
        onClick={() => {
          if (checked) {
            onUncheck();
          } else {
            onCheck();
          }
        }}
      >
        <CheckIcon />
      </button>
      <div className="task-info">
        <strong>{header}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

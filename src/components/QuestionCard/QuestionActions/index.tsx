import { BugIcon } from "lucide-react";
import { useClosePopover } from "../../../hooks/useClosePopover";

interface Props {
  question: {
    id: number;
    type: number;
    question_text: string;
    attempts_count: number;
    exams: {
      id: number;
      name: string;
      exam_type: string;
      date: string;
    }[];
  };
  setRawText: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionActions = ({ question, setRawText }: Props) => {
  useClosePopover(`--question-${question.id}-actions-popover`);

  return (
    <div
      popover="auto"
      className="popover-card left down"
      id={`--question-${question.id}-actions-popover`}
      style={{
        positionAnchor: `--question-${question.id}-actions-popover-anchor`,
      }}
    >
      <button
        aria-label="Report"
        className="popover-entry"
      >
        <BugIcon />
        <p>Report</p>
      </button>
      <button
        aria-label="Show Raw Text"
        className="popover-entry"
        onClick={(e) => {
          e.stopPropagation();
          setRawText(p => !p);
        }}
      >
        <BugIcon />
        <p>Show Raw Text</p>
      </button>
    </div>
  );
};

export default QuestionActions;

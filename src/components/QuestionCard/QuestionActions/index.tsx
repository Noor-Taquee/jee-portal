import type { SearchQuestion } from "..";
import { BugIcon, SigmaIcon, TextInitialIcon } from "lucide-react";
import { useClosePopover } from "../../../hooks/useClosePopover";

interface Props {
  question: SearchQuestion;
  rawText: boolean;
  setRawText: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionActions = ({ question, rawText ,setRawText }: Props) => {
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
        aria-label="Show Raw Text"
        className="popover-entry"
        onClick={(e) => {
          e.stopPropagation();
          setRawText(p => !p);
        }}
      >
        {rawText ? <SigmaIcon /> : <TextInitialIcon />}
        <p>Show {rawText ? "formatted" : "raw"} text</p>
      </button>

      <hr className="divider" />

      <button
        aria-label="Report"
        className="popover-entry"
      >
        <BugIcon />
        <p>Report</p>
      </button>

    </div>
  );
};

export default QuestionActions;

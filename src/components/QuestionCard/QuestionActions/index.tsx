import type { SearchQuestion } from "..";
import {
  BugIcon,
  SigmaIcon,
  Share2Icon,
  TextInitialIcon,
  BookmarkPlusIcon,
} from "lucide-react";
import { useAutoClosePopover } from "../../../hooks/useAutoClosePopover";

interface Props {
  question: SearchQuestion;
  rawText: boolean;
  setRawText: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionActions = ({ question, rawText, setRawText }: Props) => {
  useAutoClosePopover(`--question-${question.id}-actions-popover`);

  const shareData: ShareData = {
    title: "Share the question",
    text: "Check out this amazing question!",
    url: `${window.location.origin}/question/${question.id}`,
  };

  return (
    <div
      popover="auto"
      className="popover-card left down"
      id={`--question-${question.id}-actions-popover`}
      style={{
        positionAnchor: `--question-${question.id}-actions-popover-anchor`,
      }}
    >
      <div className="horizontal-container">
        <button
          aria-label="Share"
          className="popover-entry"
          onClick={async (e) => {
            e.stopPropagation();

            function copyToClipboard(content: string) {
              navigator.clipboard.writeText(content);
            }

            if (navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
              } catch {
                copyToClipboard(shareData.url ?? "");
              }
            }
          }}
        >
          <Share2Icon />
          <p>Share</p>
        </button>
        <button
          aria-label="Share"
          className="popover-entry"
          onClick={async (e) => {
            e.stopPropagation();

            function copyToClipboard(content: string) {
              navigator.clipboard.writeText(content);
            }

            if (navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
              } catch {
                copyToClipboard(shareData.url ?? "");
              }
            }
          }}
        >
          <BookmarkPlusIcon />
          <p>Save</p>
        </button>
      </div>

      <div className="vertical-container">
        <button
          aria-label="Show Raw Text"
          className="popover-entry"
          onClick={(e) => {
            e.stopPropagation();
            setRawText((p) => !p);
          }}
        >
          {rawText ? <SigmaIcon /> : <TextInitialIcon />}
          <p>Show {rawText ? "formatted" : "raw"} text</p>
        </button>

        <hr />

        <button
          aria-label="Report"
          className="popover-entry"
          onClick={(e) => e.stopPropagation()}
        >
          <BugIcon />
          <p>Report</p>
        </button>
      </div>
    </div>
  );
};

export default QuestionActions;

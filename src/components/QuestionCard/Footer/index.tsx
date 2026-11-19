import type { SearchQuestion } from "..";
import {
  ArrowRightIcon,
  Share2Icon,
} from "lucide-react";

interface Props {
  question: SearchQuestion;
}

const Footer = ({ question }: Props) => {

  const shareData: ShareData = {
    title: "Share the question",
    text: "Check out this amazing question!",
    url: `${window.location.origin}/question/${question.id}`,
  };

  return (
    <footer>
      <div className="question-stats">
        <p className="attempts">
          <strong>{question.attempts_count}</strong>
          <span>attempts</span>
        </p>
      </div>
      <button
        title="Share"
        className="select-button"
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
        className="cta-1"
      >
        <p>Solve</p>
        <ArrowRightIcon />
      </button>
    </footer>
  );
}

export default Footer;

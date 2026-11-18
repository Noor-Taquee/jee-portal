import "./style.css";

import TextRenderer from "../TextRenderer";
import { useNavigate } from "react-router-dom";
import { parseType } from "../../utils/parseQuestion";
import {
  EllipsisVerticalIcon,
  TextPenIcon,
  Share2Icon,
} from "lucide-react";
import QuestionActions from "./QuestionActions";
import { useState } from "react";

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
}

export default function QuestionCard({ question }: Props) {
  const [rawText, setRawText] = useState(false);

  const navigate = useNavigate();

  const exam = question.exams[0];

  const questionType = parseType(question.type);

  const shareData: ShareData = {
    title: "Share the question",
    text: "Check out this amazing question!",
    url: `${window.location.origin}/question/${question.id}`,
  };

  if (!exam) return;

  return (
    <article
      tabIndex={0}
      role="link"
      className="question-search-card"
      onClick={() => {
        navigate(`/question/${question.id}`);
      }}
    >
      <header>
        <div className="question-number">
          <p className="question-id">{question.id}</p>
        </div>

        <div className="question-info">
          <strong className="exam">{exam.name}</strong>
          <p className="type">{questionType && questionType.name}</p>
        </div>

        <button
          popoverTarget={`--question-${question.id}-actions-popover`}
          style={{
            anchorName: `--question-${question.id}-actions-popover-anchor`,
          }}
          className="question-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVerticalIcon />
        </button>

        <QuestionActions
          question={question}
          setRawText={setRawText}
        />
      </header>

      <div>
        {rawText ? (
          <p>{question.question_text}</p>
        ) : (
          <TextRenderer content={question.question_text} />
        )}
      </div>

      <footer>
        <div className="question-stats">
          <strong>{question.attempts_count}</strong>
          <TextPenIcon />
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
        </button>
      </footer>
    </article>
  );
}

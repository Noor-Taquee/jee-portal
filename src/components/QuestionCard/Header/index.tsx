import "./style.css";

import type { SearchQuestion } from "..";
import { parseType } from "../../../utils/parseQuestion";
import { EllipsisVerticalIcon } from "lucide-react";
import QuestionActions from "../QuestionActions";

interface Props {
  question: SearchQuestion;
  rawText: boolean;
  setRawText: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ question, rawText, setRawText }: Props) => {
  const exam = question.exams[0];
  const questionType = parseType(question.type);

  return (
    <header>
      <div className="question-number">
        <p className="question-id">{question.id}</p>
      </div>

      <div className="question-info">
        <strong className="exam">{exam?.name ?? "Unknown"}</strong>
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
        rawText={rawText}
        setRawText={setRawText}
      />
    </header>
  );
};

export default Header;

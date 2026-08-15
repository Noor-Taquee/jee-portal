import "./style.css";

import TextRenderer from "../../../../../components/TextRenderer";

interface QuestionDivProps {
  index: number;
  content: string;
}

/** The main question content being displayed. */
export default function QuestionCard({ index, content }: QuestionDivProps) {
  return (
    <div id="question-card">
      <p id="question-no">Q{index}</p>
      <TextRenderer content={content} />
    </div>
  );
}

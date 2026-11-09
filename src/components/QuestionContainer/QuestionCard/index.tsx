import "./style.css";

import TextRenderer from "../../TextRenderer";

interface Props {
  content: string;
}

/** The main question content being displayed. */
export default function QuestionCard({ content }: Props) {
  return (
    <div id="question-card">
      <TextRenderer content={content} />
    </div>
  );
}

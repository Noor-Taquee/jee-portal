import "./style.css";

import EditableText from "../EditableText";

interface Props {
  question: string;
}

export default function QuestoinCard({ question }: Props) {
  return (
    <div id="review-question-card">
      <EditableText question={question} />
    </div>
  );
}

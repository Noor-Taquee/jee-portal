import type { TextFormat } from "../../../../../core/data";
import TextContent from "../TextContent";

interface QuestionDivProps {
  index: number;
  content: TextFormat;
}

export default function QuestionDiv({ index, content }: QuestionDivProps) {
  return (
    <div id="question-div">
      <p id="question-no">Q{index}</p>
      <TextContent content={content} />
    </div>
  );
}

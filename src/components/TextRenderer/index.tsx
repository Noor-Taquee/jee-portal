import "./style.css";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

interface TextRendererProps {
  /** Text in the form of markdown. */
  content: string;
}

/** Renders Question using `ReactMarkdown` */
export default function TextRenderer({ content }: TextRendererProps) {
  return (
    <div className="rendered-content">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

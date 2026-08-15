import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface TextRendererProps {
  /** Text in the form of markdown. */
  content: string;
}

/** Renders Question using `ReactMarkdown` */
export default function TextRenderer({ content }: TextRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  );
}

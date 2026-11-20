import "./style.css";
import "katex/dist/katex.min.css";

import { useSettings } from "../../hooks/useSettings";
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
  const appSettings = useSettings();
  const formattedContent = content.replace(/\\n/gu, "\n") ?? "";

  return (
    <div
      className="rendered-content"
      style={
        { "--text-size": `${appSettings.textSize}px` } as React.CSSProperties
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
}

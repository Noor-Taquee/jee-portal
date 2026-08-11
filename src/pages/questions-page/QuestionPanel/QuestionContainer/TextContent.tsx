import type { TextFormat } from "../../../../core/data";

interface TextContentProps {
  content: TextFormat;
}

export default function TextContent({ content }: TextContentProps) {
  return (
    <>
      {content.map((o, i) => {
        const key = i;

        if (o.type === "text") {
          if (o.place && o.place === "standalone") {
            return <p key={key}>{o.content}</p>;
          }
          return <span key={key}>{o.content}</span>;
        } else if (o.type === "image") {
          return (
            <img
              src={o.content}
              key={key}
            />
          );
        } else if (o.type === "equation") {
          if (o.place && o.place === "standalone") {
            return <p key={key}>{o.content}</p>;
          }
          return <span key={key}>{o.content}</span>;
        }
        return <div key={key}></div>;
      })}
    </>
  );
}

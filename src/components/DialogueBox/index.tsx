import "./style.css";

interface DialogueBoxProps {
  header: string;
  texts: string[];
  children?: React.ReactNode;
}

export default function DialogueBox({
  header,
  texts,
  children,
}: DialogueBoxProps) {
  return (
    <div
      className="app-panel"
      id="dialogue-box"
    >
      <p className="dialogue-header">{header}</p>
      <p className="dialogue-text">
        {texts.map((message, i) => (
          <p key={`message-${i}`}>{message}</p>
        ))}
      </p>
      <div id="dialogue-box-btns">{children}</div>
    </div>
  );
}

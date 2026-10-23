import "./style.css";

interface DialogBoxProps {
  header: string;
  texts: string[];
  children?: React.ReactNode;
}

export default function DialogBox({ header, texts, children }: DialogBoxProps) {
  return (
    <div
      className="app-panel"
      id="dialog-box"
    >
      <p className="dialog-header">{header}</p>
      <p className="dialog-text">
        {texts.map((message, i) => (
          <span key={`message-${i}`}>{message}</span>
        ))}
      </p>
      <div id="dialog-box-btns">{children}</div>
    </div>
  );
}

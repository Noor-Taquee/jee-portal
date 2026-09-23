import "./style.css";

interface props {
  /** Label text that appears on top of input box.  */
  label: string;

  /** Error message to display below the input box. */
  error: string | null;

  /** The content to display inside the input box. */
  children: React.ReactNode;
}

export default function InputArea({ label, children, error }: props) {
  return (
    <div className="input-area">
      <p className="label">{label}</p>
      <div className="input-box">{children}</div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

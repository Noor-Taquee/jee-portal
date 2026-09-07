import "./style.css";

interface ActionBtnProps {
  onClick?: () => void;
  id?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

/** Basic horizontal button. */
export default function ActionBtn({
  className,
  onClick,
  title,
  children,
}: ActionBtnProps) {
  return (
    <button
      title={title}
      className={`action-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

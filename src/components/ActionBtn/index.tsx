import "./style.css";

interface ActionBtnProps {
  onClick?: () => void;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Basic horizontal button. */
export default function ActionBtn({
  className,
  onClick,
  children,
}: ActionBtnProps) {
  return (
    <button
      className={`action-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

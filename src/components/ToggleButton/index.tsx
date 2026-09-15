import "./style.css";

interface ToggleButtonProps {
  className?: string;
  id?: string;
  title?: string;
  onClick?: (...props: any) => any;
  children: React.ReactNode;
}

export default function ToggleButton({
  title,
  id,
  className,
  onClick,
  children,
}: ToggleButtonProps) {
  return (
    <button
      className={`toggle-button ${className}`}
      id={id}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

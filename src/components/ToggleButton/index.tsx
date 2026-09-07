import "./style.css";

interface ToggleButtonProps {
  icon: string;
  className?: string;
  id?: string;
  title?: string;
  onClick?: (...props: any) => any;
}

export default function ToggleButton({
  icon,
  onClick,
  className,
  id,
  title,
}: ToggleButtonProps) {
  return (
    <button
      className={`toggle-button ${className}`}
      id={id}
      title={title}
      onClick={onClick}
    >
      <i className={icon}></i>
    </button>
  );
}

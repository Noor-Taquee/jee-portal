import "./style.css";

interface ToggleButtonProps {
  icon: string;
  className?: string;
  id?: string;
  onClick?: (...props: any) => any;
}

export default function ToggleButton({
  icon,
  onClick,
  className,
  id,
}: ToggleButtonProps) {
  return (
    <button
      className={`toggle-button ${className}`}
      id={id}
      onClick={onClick}
    >
      <i className={icon}></i>
    </button>
  );
}

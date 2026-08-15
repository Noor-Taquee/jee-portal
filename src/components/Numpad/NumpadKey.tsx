interface NumpadKeyProps {
  text: string;
  icon?: boolean;
  onClick: () => void;
}

export default function NumpadKey({ text, icon, onClick }: NumpadKeyProps) {
  return (
    <button
      className="numpad-key"
      onClick={onClick}
    >
      {icon && <i className={text}></i>}
      {!icon && <p>{text}</p>}
    </button>
  );
}

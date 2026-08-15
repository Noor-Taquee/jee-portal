import "./style.css";

interface ActionBtnProps {
  icon: string;
  text: string;
  onClick: () => void;
}

export default function ActionBtn({ icon, text, onClick }: ActionBtnProps) {
  return (
    <button
      className={"action-btn"}
      onClick={onClick}
    >
      <i className={`ph-bold ph-${icon}`} />
      <p>{text}</p>
    </button>
  );
}

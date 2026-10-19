import "./style.css";

interface Props {
  header: string;
  description: string;
  onCheck: () => void;
  onUncheck: () => void;
}

export default function Task({
  header,
  description,
  onCheck,
  onUncheck,
}: Props) {
  return (
    <div className="review-task">
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) {
            onCheck();
          } else {
            onUncheck();
          }
        }}
      />
      <div className="task-info">
        <h3>{header}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

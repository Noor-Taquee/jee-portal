import "./style.css";

export default function AccuracyCard() {
  return (
    <div
      className="analytics-card"
      id="accuracy-card"
    >
      <p className="header">Accuracy</p>
      <p>
        <span id="user-percentage">--</span>
        <span>%</span>
      </p>
    </div>
  );
}

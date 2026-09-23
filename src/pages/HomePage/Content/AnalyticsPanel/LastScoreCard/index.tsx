import "./style.css";

export default function LastScoreCard() {
  return (
    <div
      className="analytics-card"
      id="last-score-card"
    >
      <p className="header">Last Score</p>
      <p>
        <span id="user-score">--</span>/<span id="total-score">300</span>
      </p>
    </div>
  );
}

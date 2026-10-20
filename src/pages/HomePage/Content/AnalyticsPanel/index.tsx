import "./style.css";

import AccuracyCard from "./AccuracyCard";
import LastScoreCard from "./LastScoreCard";

export default function AnalyticsPanel() {
  return (
    <div id="analytics-panel">
      <LastScoreCard />
      <AccuracyCard />
    </div>
  );
}

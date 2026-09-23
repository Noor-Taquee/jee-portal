import "./style.css";

import AccuracyCard from "./AccuracyCard";
import LastScoreCard from "./LastScoreCard";
import { useUser } from "../../../../hooks/useUser";

export default function AnalyticsPanel() {
  const { user } = useUser();

  if (!user) return <div />;

  return (
    <div id="analytics-panel">
      <LastScoreCard />
      <AccuracyCard />
    </div>
  );
}

import "./style.css";

import { HistoryIcon } from "lucide-react";

export default function HistoryPanel() {
  return (
    <div id="history-box-wrapper">
      <div className="header">
        <p>History</p>
        <HistoryIcon />
      </div>
      <p id="placeholder-message">No Tests Attempted</p>
    </div>
  );
}

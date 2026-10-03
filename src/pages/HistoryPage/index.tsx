import "./style.css";

import Header from "./Header";
import TestHistoryTable from "./TestHistoryTable";

export default function HistoryPage() {
  return (
    <div
      id="history-page"
      className="app-panel"
    >
      <div id="panel-header">
        <div className="panel-name-container">
          <p className="header">Test History</p>
        </div>
      </div>

      <Header />

      <TestHistoryTable />
    </div>
  );
}

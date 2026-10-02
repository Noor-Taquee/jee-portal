import "./style.css";

export default function HistoryPage() {
  return (
    <div
      id="history-page"
      className="app-panel"
    >
      <div id="panel-header">
        <p className="header">History</p>
      </div>

      <div id="history-table-wrapper">
        <div className="table-header"></div>
        <div id="history-table"></div>
      </div>
    </div>
  );
}

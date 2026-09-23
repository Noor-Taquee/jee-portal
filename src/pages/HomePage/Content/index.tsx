import "./style.css";

import { useUser } from "../../../hooks/useUser";

import Suggestions from "./Suggestions";
import HistoryPanel from "./HistoryPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import ExamCountdown from "../../../components/ExamCountdown";

export default function Content() {
  const { user } = useUser();

  if (!user) return <div />;

  return (
    <div className="content-div">
      <div id="home-header">
        <div id="welcome-box">
          <p id="welcome-message">Welcome back, {user.name}</p>
          <p id="welcome-text">
            Track performance and attempt daily practice tests.
          </p>
        </div>
        <ExamCountdown />
      </div>
      <AnalyticsPanel />
      <div className="flex w-auto m-2 gap-2 px-2">
        <HistoryPanel />
        <Suggestions />
      </div>
    </div>
  );
}

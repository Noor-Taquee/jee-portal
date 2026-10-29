import "./style.css";

import { useUser } from "../../../hooks/useUser";

import Suggestions from "./Suggestions";
import AnalyticsPanel from "./AnalyticsPanel";
import ExamCountdown from "../../../components/ExamCountdown";

export default function HomeContent() {
  const { user } = useUser();

  if (!user) return <div />;

  return (
    <div id="home-content">
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
      <div>
        <Suggestions />
      </div>
    </div>
  );
}

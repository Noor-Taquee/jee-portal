import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnalyticsPanel from "./AnalyticsPanel";
import ExamCountdown from "../../../components/ExamCountdown";

export default function HomeContent() {
  const { user } = useUser();

  if (!user) return <div />;

  return (
    <div
      className="app-panel"
      id="home-page"
    >
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <header className="panel-header">
        <div id="welcome-box">
          <p id="welcome-message">Welcome back, {user.name}</p>
          <p id="welcome-text">
            Track performance and attempt daily practice tests.
          </p>
        </div>
        <ExamCountdown />
      </header>
      <AnalyticsPanel />
      <div>
        <Link
          className="cta-1"
          to={"/practice"}
        >
          <p>Start practicing</p>
        </Link>
      </div>
    </div>
  );
}

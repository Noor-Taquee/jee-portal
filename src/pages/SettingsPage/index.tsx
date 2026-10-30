import "./style.css";

import { Outlet } from "react-router-dom";
import SettingsNav from "./SettingsNav";

export default function SettingsPage() {
  return (
    <div
      id="settings-page"
      className="app-panel"
    >
      <SettingsNav />
      <div id="settings-container">
        <Outlet />
      </div>
    </div>
  );
}

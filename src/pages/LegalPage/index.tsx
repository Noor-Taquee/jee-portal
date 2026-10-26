import "./style.css";

import { Outlet } from "react-router-dom";

export default function LegalPage() {
  return (
    <div
      id="legal-page"
      className="app-panel"
    >
      <Outlet />
    </div>
  );
}

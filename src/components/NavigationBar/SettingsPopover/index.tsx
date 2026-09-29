import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { ChevronRight } from "lucide-react";

export default function SettingsPopover() {
  const { logout } = useUser();

  return (
    <div
      id="settings-popover"
      className="popover-card right up"
      popover="auto"
      style={{ positionAnchor: "--settings-popover-anchor" }}
    >
      <button
        className="popover-entry"
        popoverTarget="appearance-popover"
        style={{ anchorName: "--appearance-popover-anchor" }}
      >
        <span>Appearance</span>
        <ChevronRight />
      </button>
      <span className="divider"></span>
      <button
        className="popover-entry danger"
        onClick={() => logout()}
      >
        <span>Logout</span>
      </button>
    </div>
  );
}

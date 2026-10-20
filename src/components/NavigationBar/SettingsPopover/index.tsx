import "./style.css";

import { useClerk } from "@clerk/react";

import { ChevronRight } from "lucide-react";

export default function SettingsPopover() {
  const { signOut } = useClerk();

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
        onClick={() => {
          signOut();
        }}
      >
        <span>Logout</span>
      </button>
    </div>
  );
}

import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { ChevronRight, InfoIcon, LogOutIcon, PaletteIcon } from "lucide-react";

export default function SettingsPopover() {
  const { logout } = useUser();

  return (
    <div
      id="settings-popover"
      className="popover-card up"
      popover="auto"
      style={{ positionAnchor: "--settings-popover-anchor" }}
    >
      <button
        className="popover-entry"
        popoverTarget="appearance-popover"
        style={{ anchorName: "--appearance-popover-anchor" }}
      >
        <PaletteIcon />
        <span>Appearance</span>
        <ChevronRight className="next" />
      </button>
      <button
        className="popover-entry"
        popoverTarget="know-more-popover"
        style={{ anchorName: "--know-more-popover-anschor" }}
      >
        <InfoIcon />
        <span>Know more</span>
        <ChevronRight className="next" />
      </button>
      <span className="divider"></span>
      <button
        className="popover-entry danger"
        onClick={() => {
          logout();
        }}
      >
        <LogOutIcon />
        <span>Logout</span>
      </button>
    </div>
  );
}

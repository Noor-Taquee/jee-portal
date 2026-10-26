import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { ChevronRight, InfoIcon, LogOutIcon, PaletteIcon } from "lucide-react";

export default function SettingsPopover() {
  const { logout } = useUser();

  return (
    <div
      role="menu"
      popover="auto"
      id="settings-popover"
      className="popover-card up"
      style={{ positionAnchor: "--settings-popover-anchor" }}
    >
      <button
        name="appearance"
        role="menuitem"
        className="popover-entry"
        popoverTarget="appearance-popover"
        style={{ anchorName: "--appearance-popover-anchor" }}
      >
        <PaletteIcon />
        <span>Appearance</span>
        <ChevronRight className="next" />
      </button>
      <button
        name="know-more"
        role="menuitem"
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
        name="logout"
        role="menuitem"
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

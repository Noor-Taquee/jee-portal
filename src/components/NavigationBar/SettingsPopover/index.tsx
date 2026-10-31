import "./style.css";

import { useUser } from "../../../hooks/useUser";
import { useClosePopover } from "../../../hooks/useClosePopover";

import { Link } from "react-router-dom";
import {
  ChevronRight,
  InfoIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
} from "lucide-react";

export default function SettingsPopover() {
  useClosePopover("settings-popover");

  const { logout } = useUser();

  return (
    <div
      role="menu"
      popover="auto"
      id="settings-popover"
      className="popover-card up right-level"
      style={{ positionAnchor: "--settings-popover-anchor" }}
    >
      <Link
        aria-label="Settings"
        role="menuitem"
        className="popover-entry"
        to="/settings"
      >
        <SettingsIcon />
        <span>Settings</span>
      </Link>
      <button
        name="appearance"
        aria-label="Appearance"
        role="menuitem"
        className="popover-entry linked"
        popoverTarget="appearance-popover"
        style={{ anchorName: "--appearance-popover-anchor" }}
      >
        <PaletteIcon />
        <span>Appearance</span>
        <ChevronRight className="next" />
      </button>
      <button
        name="know-more"
        aria-label="Know more"
        role="menuitem"
        className="popover-entry linked"
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
        aria-label="Logout"
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

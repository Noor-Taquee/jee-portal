import "./style.css";

import { useUser } from "../../../hooks/useUser";

import {
  ChevronRight,
  InfoIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPopover() {
  const navigate = useNavigate();
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
        name="settings"
        aria-label="Settings"
        role="menuitem"
        className="popover-entry"
        onClick={() => {
          navigate("/settings");
        }}
      >
        <SettingsIcon />
        <span>Settings</span>
      </button>
      <button
        name="appearance"
        aria-label="Appearance"
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
        aria-label="Know more"
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

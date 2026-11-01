import { useSettings } from "../../../../../hooks/useSettings";
import { useClosePopover } from "../../../../../hooks/useClosePopover";

import { CheckIcon } from "lucide-react";

export default function SettingsThemePopover() {
  const settings = useSettings();
  useClosePopover("settings-theme-popover");

  return (
    <div
      role="menu"
      id="settings-theme-popover"
      popover="auto"
      className="popover-card down left-level"
      style={{ positionAnchor: "--settings-theme-popover-anchor" }}
    >
      <button
        aria-label="Light"
        role="menuitemradio"
        aria-checked={settings.theme === "light" ? "true" : "false"}
        className="popover-entry"
        onClick={() => {
          if (settings.theme !== "light") {
            settings.changeTheme();
          }
        }}
      >
        <p>Light</p>
        {settings.theme === "light" && <CheckIcon className="check" />}
      </button>
      <button
        aria-label="Dark"
        role="menuitemradio"
        aria-checked={settings.theme === "dark" ? "true" : "false"}
        className="popover-entry"
        onClick={() => {
          if (settings.theme !== "dark") {
            settings.changeTheme();
          }
        }}
      >
        <p>Dark</p>
        {settings.theme === "dark" && <CheckIcon className="check" />}
      </button>
    </div>
  );
}

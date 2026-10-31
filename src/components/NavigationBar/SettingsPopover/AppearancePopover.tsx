import { useClosePopover } from "../../../hooks/useClosePopover";
import { useSettings } from "../../../hooks/useSettings";

import { CheckIcon } from "lucide-react";

export default function AppearancePopover() {
  useClosePopover("appearance-popover");
  const settings = useSettings();

  return (
    <div
      role="menu"
      popover="auto"
      id="appearance-popover"
      className="popover-card right down-level"
      style={{ positionAnchor: "--appearance-popover-anchor" }}
    >
      <button
        name="light"
        role="menuitem"
        className="popover-entry"
        onClick={() => {
          if (settings.theme !== "light") settings.changeTheme();
        }}
      >
        <span>Light</span>
        {settings.theme === "light" && <CheckIcon className="check" />}
      </button>
      <button
        name="dark"
        role="menuitem"
        className="popover-entry"
        onClick={() => {
          if (settings.theme !== "dark") settings.changeTheme();
        }}
      >
        <span>Dark</span>
        {settings.theme === "dark" && <CheckIcon className="check" />}
      </button>
    </div>
  );
}

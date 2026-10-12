import { useSettings } from "../../../hooks/useSettings";

import { CheckIcon } from "lucide-react";

export default function AppearancePopover() {
  const settings = useSettings();

  return (
    <div
      id="appearance-popover"
      className="popover-card right down"
      popover="auto"
      style={{ positionAnchor: "--appearance-popover-anchor" }}
    >
      <button
        className="popover-entry"
        onClick={() => {
          if (settings.theme !== "light") settings.changeTheme();
        }}
      >
        <span>Light</span>
        {settings.theme === "light" && <CheckIcon className="check" />}
      </button>
      <button
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

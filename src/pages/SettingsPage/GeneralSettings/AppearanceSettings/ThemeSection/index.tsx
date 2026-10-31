import { ChevronDownIcon } from "lucide-react";
import { useSettings } from "../../../../../hooks/useSettings";

import SettingsThemePopover from "./SettingsThemePopover";

export default function ThemeSection() {
  const settings = useSettings();

  return (
    <section className="settings-section value-based">
      <div className="settings-property">
        <p>Theme</p>
      </div>
      <div className="settings-value">
        <button
          role="combobox"
          aria-haspopup="menu"
          className="settings-value-input"
          popoverTarget="settings-theme-popover"
          style={{ anchorName: "--settings-theme-popover-anchor" }}
        >
          <p>{settings.theme}</p>
          <ChevronDownIcon />
        </button>
        <SettingsThemePopover />
      </div>
    </section>
  );
}

import { useSettings } from "../../../../../hooks/useSettings";

import { ChevronsUpDownIcon } from "lucide-react";
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
          className="select-button"
          popoverTarget="settings-theme-popover"
          style={{ anchorName: "--settings-theme-popover-anchor" }}
        >
          <p>{settings.theme}</p>
          <ChevronsUpDownIcon />
        </button>
        <SettingsThemePopover />
      </div>
    </section>
  );
}

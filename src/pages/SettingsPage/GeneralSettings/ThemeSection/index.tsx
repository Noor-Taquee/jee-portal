import { ChevronDownIcon } from "lucide-react";
import { useSettings } from "../../../../hooks/useSettings";
import SettingsThemePopover from "./SettingsThemePopover";

export default function ThemeSection() {
  const settings = useSettings();

  return (
    <section className="settings-section value-based">
      <div>
        <p>Theme</p>
      </div>
      <div>
        <button
          role="combobox"
          aria-haspopup="menu"
          className="select-button"
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

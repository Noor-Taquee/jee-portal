import { useSettings } from "../../../hooks/useSettings";

import ToggleButton from "../../../components/ToggleButton";
import { MoonIcon, SunIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

export default function UtilityTools() {
  const appSettings = useSettings();

  return (
    <div
      id="utility-box"
      className="flex gap-1.5 w-fit h-fit"
    >
      <ToggleButton
        title={`Switch to ${appSettings.theme === "dark" ? "light" : "dark"} mode`}
        className="utility-button"
        onClick={() => {
          appSettings.changeTheme();
        }}
      >
        {appSettings.theme === "light" ? <SunIcon /> : <MoonIcon />}
      </ToggleButton>
      <ToggleButton
        title="Decrease text size"
        className="utility-button"
        onClick={() => {
          appSettings.changeTextSize(-1);
        }}
      >
        <ZoomInIcon />
      </ToggleButton>
      <ToggleButton
        title="Increase text size"
        className="utility-button"
        onClick={() => {
          appSettings.changeTextSize(1);
        }}
      >
        <ZoomOutIcon />
      </ToggleButton>
    </div>
  );
}

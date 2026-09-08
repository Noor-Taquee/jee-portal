import { useState } from "react";
import { type AppTheme, defaultSettings, SettingsContext } from ".";

interface SettingsProviderProps {
  children: React.ReactNode;
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [theme, setTheme] = useState<AppTheme>(defaultSettings.theme);
  function changeTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const [textSize, setTextSize] = useState(defaultSettings.textSize);
  function changeTextSize(val: number) {
    setTextSize((prev) => (prev += val));
  }

  const [simpleMode, setSimpleMode] = useState(defaultSettings.simpleMode);
  function toggleSimpleMode() {
    setSimpleMode((prev) => !prev);
  }

  const value = {
    theme,
    changeTheme,
    textSize,
    changeTextSize,
    simpleMode,
    toggleSimpleMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

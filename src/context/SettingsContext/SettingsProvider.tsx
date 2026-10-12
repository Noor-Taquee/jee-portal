import { useState } from "react";
import { type AppTheme, SettingsContext } from ".";

interface SettingsProviderProps {
  children: React.ReactNode;
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [theme, setTheme] = useState<AppTheme>("light");
  function changeTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const [textSize, setTextSize] = useState<number>(18);
  function changeTextSize(val: number) {
    setTextSize((prev) => (prev += val));
  }

  const [simpleMode, setSimpleMode] = useState<boolean>(false);
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

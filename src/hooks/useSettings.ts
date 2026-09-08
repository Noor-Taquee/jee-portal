import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

/**
 * Hook to access/modify app settings using the `SettingsContext`.
 */
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

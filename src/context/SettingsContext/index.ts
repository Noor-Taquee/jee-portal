import { createContext } from "react";

export type AppTheme = "light" | "dark";

export type AppSettings = {
  theme: AppTheme;
  changeTheme: () => void;
  textSize: number;
  changeTextSize: (val: number) => void;
  simpleMode: boolean;
  toggleSimpleMode: () => void;
};

export const defaultSettings: AppSettings = {
  theme: "dark",
  changeTheme: () => {},
  textSize: 16,
  changeTextSize: () => {},
  simpleMode: false,
  toggleSimpleMode: () => {},
};

export const SettingsContext = createContext(defaultSettings);

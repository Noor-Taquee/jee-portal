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

export const SettingsContext = createContext<AppSettings | null>(null);

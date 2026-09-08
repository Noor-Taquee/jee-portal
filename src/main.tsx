import "./index.css";
import "./styles/colors.css";

import "katex/dist/katex.min.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";
import SettingsProvider from "./context/SettingsContext/SettingsProvider";

const root = document.getElementById("root") as HTMLDivElement | null;

if (!root) throw ReferenceError("Root not found!");

createRoot(root).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>
);

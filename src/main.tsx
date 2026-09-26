import "./index.css";
import "./styles/colors.css";

import "katex/dist/katex.min.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import SettingsProvider from "./context/SettingsContext/SettingsProvider";
import UserProvider from "./context/UserContext/Provider";
import ExamProvider from "./context/ExamContext/ExamProvider";

import App from "./App";

const root = document.getElementById("root") as HTMLDivElement | null;

if (!root) throw ReferenceError("Root not found!");

createRoot(root).render(
  <StrictMode>
    <SettingsProvider>
      <UserProvider>
        <ExamProvider>
          <App />
        </ExamProvider>
      </UserProvider>
    </SettingsProvider>
  </StrictMode>
);

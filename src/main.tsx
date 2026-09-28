import "./index.css";
import "./styles/colors.css";

import "katex/dist/katex.min.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import SettingsProvider from "./context/SettingsContext/SettingsProvider";
import UserProvider from "./context/UserContext/Provider";
import ExamProvider from "./context/ExamContext/ExamProvider";

import App from "./App";

const root = document.getElementById("root") as HTMLDivElement | null;

if (!root) throw ReferenceError("Root not found!");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/u, "") || "/"}
    >
      <SettingsProvider>
        <UserProvider>
          <ExamProvider>
            <App />
          </ExamProvider>
        </UserProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
);

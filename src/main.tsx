import "./index.css";
import "./styles/colors.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import SettingsProvider from "./context/SettingsContext/SettingsProvider";
import UserProvider from "./context/UserContext/Provider";

import App from "./App";

const root = document.getElementById("root");

if (!root) throw ReferenceError("Root not found!");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/u, "") || "/"}
    >
      <HelmetProvider>
        <SettingsProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SettingsProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./styles/colors.css";

import App from "./App";

const root = document.getElementById("root") as HTMLDivElement | null;

if (!root) throw ReferenceError("Root not found!");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

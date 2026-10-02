// oxlint-disable max-lines-per-function
import "./style.css";

import { HistoryIcon, HomeIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const navButtons: [text: string, route: string, icon: () => React.ReactNode][] =
  [
    ["home", "home", () => <HomeIcon />],
    ["history", "history", () => <HistoryIcon />],
  ];

export default function ButtonContainer() {
  return (
    <div id="navigation-btn-div">
      {navButtons.map((stack) => (
        <NavLink
          to={`/${stack[1]}`}
          key={`nav-${stack[0]}`}
          className={({ isActive }) =>
            `navigation-button ${isActive ? "active" : ""}`
          }
        >
          {stack[2]()}
          <p>{stack[0]}</p>
        </NavLink>
      ))}
    </div>
  );
}

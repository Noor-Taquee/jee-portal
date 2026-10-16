// oxlint-disable max-lines-per-function
import "./style.css";

import { HomeIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const navButtons: [
  label: string,
  route: string,
  icon: () => React.ReactNode,
][] = [["home", "home", () => <HomeIcon />]];

export default function ButtonContainer() {
  return (
    <div id="navigation-btn-div">
      {navButtons.map(([label, route, icon]) => (
        <NavLink
          to={`/${route}`}
          key={`nav-${label}`}
          className={({ isActive }) =>
            `navigation-button ${isActive ? "active" : ""}`
          }
        >
          {icon()}
          <p>{label}</p>
        </NavLink>
      ))}
    </div>
  );
}

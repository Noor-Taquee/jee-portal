import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";

export default function ButtonContainer() {
  const { user } = useUser();

  const navButtons: [
    label: string,
    route: string,
    icon: () => React.ReactNode,
  ][] = [
    ["home", "", () => <HomeIcon />],
    ["search", "/search", () => <SearchIcon />],
  ];

  if (user?.role === "admin" || user?.role === "maintainer") {
    navButtons.push(["admin", "/admin", () => <ShieldCheckIcon />]);
  }

  return (
    <div id="navigation-btn-div">
      {navButtons.map(([label, route, icon]) => (
        <NavLink
          to={route}
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

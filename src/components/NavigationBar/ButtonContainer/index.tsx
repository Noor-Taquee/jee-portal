import "./style.css";

import { useUser } from "@clerk/react";

import { HomeIcon, ShieldCheckIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ButtonContainer() {
  const { user } = useUser();

  const role = user?.publicMetadata?.role || "";

  const navButtons: [
    label: string,
    route: string,
    icon: () => React.ReactNode,
  ][] = [["home", "home", () => <HomeIcon />]];

  // Check role from Clerk metadata
  if (role === "admin" || role === "maintainer") {
    navButtons.push(["admin", "admin", () => <ShieldCheckIcon />]);
  }

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

import { Settings2Icon, UserCog2Icon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ButtonContainer() {
  const navButtons: [
    label: string,
    route: string,
    icon: () => React.ReactNode,
  ][] = [
    ["general", "/settings/general", () => <Settings2Icon />],
    ["account", "/settings/account", () => <UserCog2Icon />],
  ];

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

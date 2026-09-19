// oxlint-disable max-lines-per-function
import "./style.css";

import { changeHash, type Route } from "../../../hooks/useHash";

import { HomeIcon } from "lucide-react";

const navButtons: [text: string, route: Route, icon: () => React.ReactNode][] =
  [["home", "home", () => <HomeIcon />]];

interface ButtonContainerProps {
  expanded: boolean;
  panel: Route;
}

export default function ButtonContainer({ panel }: ButtonContainerProps) {
  return (
    <div id="navigation-btn-div">
      {navButtons.map((stack) => (
        <button
          className={`navigation-button  ${panel === stack[1] ? "active" : ""}`}
          onClick={() => changeHash(stack[1])}
          key={`nav-${stack[0]}`}
        >
          {stack[2]()}
          <p>{stack[0]}</p>
        </button>
      ))}
    </div>
  );
}

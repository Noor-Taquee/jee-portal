import "./style.css";

import { Activity } from "react";

import AppLogo from "../../AppLogo";
import CloseButton from "./CloseButton";

interface NavigationHeaderProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavigationHeader({
  expanded,
  setExpanded,
}: NavigationHeaderProps) {
  return (
    <div id="navigation-header">
      <Activity mode={expanded ? "visible" : "hidden"}>
        <div className="navigation-brand">
          <AppLogo />
          <h4 className="header-text">JEE Portal</h4>
        </div>
      </Activity>
      <CloseButton
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </div>
  );
}

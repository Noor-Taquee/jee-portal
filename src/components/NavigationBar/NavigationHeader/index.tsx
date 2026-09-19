import "./style.css";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import ToggleButton from "../../ToggleButton";

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
      {expanded && <p className="header-text">JEE Portal</p>}
      <ToggleButton
        title={expanded ? "collapse" : "Expand"}
        onClick={() => setExpanded((p) => !p)}
      >
        {expanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      </ToggleButton>
    </div>
  );
}

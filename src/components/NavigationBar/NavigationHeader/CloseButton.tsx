import { useState } from "react";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import ConditionalComponent from "../../ConditionalComponent";
import AppLogo from "../../AppLogo";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<Props["expanded"]>>;
}

export default function CloseButton({ expanded, setExpanded }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <button
      name="toggle-nav-bar-size"
      className="toggle-button"
      title={expanded ? "collapse" : "Expand"}
      onClick={() => {
        setExpanded((p) => !p);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ConditionalComponent
        show={!expanded}
        fallback={<PanelLeftCloseIcon />}
      >
        {hover ? <PanelLeftOpenIcon /> : <AppLogo />}
      </ConditionalComponent>
    </button>
  );
}

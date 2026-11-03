import "./style.css";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "./AccountButton";
import SettingsPopover from "./SettingsPopover";
import AppearancePopover from "./SettingsPopover/AppearancePopover";
import KnowMorePopover from "./SettingsPopover/KnowMorePopover";

export default function NavigationBar() {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(true);

  if (!user) return;

  return (
    <nav
      id="navigation-bar"
      className={expanded ? "expanded" : "collapsed"}
    >
      <NavigationHeader
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <ButtonContainer />

      <SettingsPopover />
      <AppearancePopover />
      <KnowMorePopover />

      <AccountButton expanded={expanded} />
    </nav>
  );
}

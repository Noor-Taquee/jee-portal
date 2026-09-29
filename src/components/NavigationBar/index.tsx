import "./style.css";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "../AccountButton";
import Avatar from "../AccountButton/Avatar";
import SettingsPopover from "./SettingsPopover";
import AppearancePopover from "./SettingsPopover/AppearancePopover";

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(true);

  const { user } = useUser();

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

      {user &&
        (expanded ? (
          <AccountButton
            popoverTarget="settings-popover"
            style={{ anchorName: "--settings-popover-anchor" }}
          />
        ) : (
          <Avatar />
        ))}
    </nav>
  );
}

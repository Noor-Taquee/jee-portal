import "./style.css";

import { useState } from "react";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "../AccountButton";
import Avatar from "../AccountButton/Avatar";
import SettingsPopover from "./SettingsPopover";
import AppearancePopover from "./SettingsPopover/AppearancePopover";
import ConditionalComponent from "../ConditionalComponent";

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(true);

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

      <ConditionalComponent
        show={expanded}
        fallback={<Avatar />}
      >
        <AccountButton
          popoverTarget="settings-popover"
          style={{ anchorName: "--settings-popover-anchor" }}
        />
      </ConditionalComponent>
    </nav>
  );
}

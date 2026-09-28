import "./style.css";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "../AccountButton";
import Avatar from "../AccountButton/Avatar";

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
      {user && (expanded ? <AccountButton /> : <Avatar />)}
    </nav>
  );
}

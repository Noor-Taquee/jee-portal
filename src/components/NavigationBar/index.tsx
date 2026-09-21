import "./style.css";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import type { Route } from "../../hooks/useHash";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "../AccountButton";
import Avatar from "../AccountButton/Avatar";

interface NavigationBarProps {
  panel: Route;
}

export default function NavigationBar({ panel }: NavigationBarProps) {
  const [expanded, setExpanded] = useState(true);

  const { user } = useUser();

  return (
    <div
      id="navigation-bar"
      className={expanded ? "expanded" : "collapsed"}
    >
      <NavigationHeader
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <ButtonContainer panel={panel} />
      {user && (expanded ? <AccountButton /> : <Avatar />)}
    </div>
  );
}

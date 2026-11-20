import "./style.css";

import AppLogo from "../../AppLogo";
import CloseButton from "./CloseButton";

export default function NavigationHeader() {
  return (
    <div id="navigation-header">
      <div className="navigation-brand">
        <AppLogo />
        <h4 className="header-text">JEE Portal</h4>
      </div>
      <CloseButton />
    </div>
  );
}

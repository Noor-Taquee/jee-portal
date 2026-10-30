import "./style.css";

import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import ButtonContainer from "./ButtonContainer";

export default function SettingsNav() {
  return (
    <nav
      id="settings-nav"
      className="expanded"
      aria-labelledby="Settings Navigation"
    >
      <Link
        to={"/"}
        className="back-button"
      >
        <ArrowLeftIcon />
        <p>Back to app</p>
      </Link>
      <h3>Settings</h3>
      <ButtonContainer />
    </nav>
  );
}

import "./style.css";

import { useUser } from "../../hooks/useUser";
import useNavVisibility from "../../hooks/useNavVisibility";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "./AccountButton";
import SettingsPopover from "./SettingsPopover";
import AppearancePopover from "./SettingsPopover/AppearancePopover";
import KnowMorePopover from "./SettingsPopover/KnowMorePopover";

export default function NavigationBar() {
  const { user } = useUser();
  const { visible } = useNavVisibility();

  if (!user || !visible) return;

  return (
    <nav
      id="navigation-bar"
    >
      <NavigationHeader />
      <ButtonContainer />

      <SettingsPopover />
      <AppearancePopover />
      <KnowMorePopover />

      <AccountButton />
    </nav>
  );
}

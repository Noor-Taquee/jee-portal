import "./style.css";

import { m } from "framer-motion";
import { useUser } from "../../hooks/useUser";

import ButtonContainer from "./ButtonContainer";
import NavigationHeader from "./NavigationHeader";
import AccountButton from "./AccountButton";
import SettingsPopover from "./SettingsPopover";
import AppearancePopover from "./SettingsPopover/AppearancePopover";
import KnowMorePopover from "./SettingsPopover/KnowMorePopover";

export default function NavigationBar() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <m.nav
      id="navigation-bar"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <NavigationHeader />
      <ButtonContainer />

      <SettingsPopover />
      <AppearancePopover />
      <KnowMorePopover />

      <AccountButton />
    </m.nav>
  );
}

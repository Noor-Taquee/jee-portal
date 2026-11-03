import "./style.css";

import { PanelLeftIcon } from "lucide-react";
import useNavVisibility from "../../../hooks/useNavVisibility";

interface ShowNavButtonProps {
  enabled: boolean;
}

export default function ShowNavButton({ enabled }: ShowNavButtonProps) {
  const { visible, setVisible } = useNavVisibility();

  if (!enabled || visible) return null;

  return (
    <button
      type="button"
      className="show-nav-button"
      aria-label="Show navigation"
      title="Show navigation"
      onClick={() => setVisible(true)}
    >
      <PanelLeftIcon />
    </button>
  );
}

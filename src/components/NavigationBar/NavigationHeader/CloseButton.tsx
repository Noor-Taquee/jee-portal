import { PanelLeftCloseIcon } from "lucide-react";
import useNavVisibility from "../../../hooks/useNavVisibility";

export default function CloseButton() {
  const { setVisible } = useNavVisibility();

  return (
    <button
      type="button"
      name="hide-navigation"
      aria-label="Hide navigation"
      className="toggle-button"
      title="Hide navigation"
      onClick={() => setVisible(false)}
    >
      <PanelLeftCloseIcon />
    </button>
  );
}

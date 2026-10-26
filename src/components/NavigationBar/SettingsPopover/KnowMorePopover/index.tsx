import { useRef } from "react";

import { ExternalLinkIcon } from "lucide-react";

export default function KnowMorePopover() {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleNavigation = (path: string) => {
    if (
      popoverRef.current &&
      typeof popoverRef.current.hidePopover === "function"
    ) {
      popoverRef.current.hidePopover();
    }

    window.open(path, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="menu"
      popover="auto"
      id="know-more-popover"
      className="popover-card bottom right up-level"
      ref={popoverRef}
      style={{ positionAnchor: "--know-more-popover-anschor" }}
    >
      <button
        name="terms-of-service"
        role="menuitem"
        className="popover-entry"
        onClick={() => handleNavigation("/legal/terms-of-service")}
      >
        <p>Terms of service</p>
        <ExternalLinkIcon className="next" />
      </button>
      <button
        name="disclaimer"
        role="menuitem"
        className="popover-entry"
        onClick={() => handleNavigation("/legal/disclaimer")}
      >
        <p>Disclaimer</p>
        <ExternalLinkIcon className="next" />
      </button>
      <button
        name="privacy-policy"
        role="menuitem"
        className="popover-entry"
        onClick={() => handleNavigation("/legal/privacy-policy")}
      >
        <p>Privacy Policy</p>
        <ExternalLinkIcon className="next" />
      </button>
    </div>
  );
}

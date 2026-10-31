import { useClosePopover } from "../../../../hooks/useClosePopover";

import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "lucide-react";

export default function KnowMorePopover() {
  useClosePopover("know-more-popover");

  return (
    <div
      role="menu"
      popover="auto"
      id="know-more-popover"
      className="popover-card bottom right up-level"
      style={{ positionAnchor: "--know-more-popover-anschor" }}
    >
      <Link
        aria-label="Terms of Service"
        role="menuitem"
        className="popover-entry"
        to="/legal/terms-of-service"
        target="_blank"
      >
        <p>Terms of service</p>
        <ExternalLinkIcon className="next" />
      </Link>
      <Link
        aria-label="disclaimer"
        role="menuitem"
        className="popover-entry"
        to="/legal/disclaimer"
        target="_blank"
      >
        <p>Disclaimer</p>
        <ExternalLinkIcon className="next" />
      </Link>
      <Link
        aria-label="privacy-policy"
        role="menuitem"
        className="popover-entry"
        to="/legal/privacy-policy"
        target="_blank"
      >
        <p>Privacy Policy</p>
        <ExternalLinkIcon className="next" />
      </Link>
    </div>
  );
}

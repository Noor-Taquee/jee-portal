import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function KnowMorePopover() {
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
      >
        <p>Terms of service</p>
        <ExternalLinkIcon className="next" />
      </Link>
      <Link
        aria-label="disclaimer"
        role="menuitem"
        className="popover-entry"
        to="/legal/disclaimer"
      >
        <p>Disclaimer</p>
        <ExternalLinkIcon className="next" />
      </Link>
      <Link
        aria-label="privacy-policy"
        role="menuitem"
        className="popover-entry"
        to="/legal/privacy-policy"
      >
        <p>Privacy Policy</p>
        <ExternalLinkIcon className="next" />
      </Link>
    </div>
  );
}

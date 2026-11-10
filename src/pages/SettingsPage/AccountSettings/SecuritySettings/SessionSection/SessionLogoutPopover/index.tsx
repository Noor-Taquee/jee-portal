import "./style.css";

import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  sessionToken: string;
}

const SessionLogoutPopover = ({ sessionToken }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Logout this session ?");

  const popoverRef = useRef<HTMLDivElement>(null);

  async function revokeSession() {
    try {
      setLoading(true);
      setMessage("Logout this session ?");

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });
      const data = await response.json() as unknown as {
        success?: boolean;
        error?: string;
      }

      if (!response.ok || !data || !data.success) {
        throw new Error(data.error ?? "Unable to logout the session");
      }

      if (popoverRef.current && typeof popoverRef.current.hidePopover === "function") {
        popoverRef.current.hidePopover();
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
      setMessage("Unable to logout the session");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={popoverRef}
      role="alert"
      popover="auto"
      id="session-logout-popover"
    >
      <p className="message">{message}</p>
      <div>
        <button
          aria-label="Cancel"
          disabled={loading}
          popoverTarget="session-logout-popover"
          popoverTargetAction="hide"
          className="select-button"
        >
          <p>Cancel</p>
        </button>
        <button
          aria-label="Logout"
          className="cta-1"
          onClick={revokeSession}
        >
          {loading ? <Loader2Icon className="spin" />  : <p>Logout</p>}
        </button>
      </div>
    </div>
  );
}


export default SessionLogoutPopover;

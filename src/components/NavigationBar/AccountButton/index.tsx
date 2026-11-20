import "./style.css";

import { useUser } from "../../../hooks/useUser";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import Avatar from "../../Avatar";

export default function AccountButton() {
  const { user } = useUser();

  if (!user) return;

  const verifiedUser = ["admin", "maintainer"].includes(user.role);

  return (
    <button
      id="account-button"
      popoverTarget="settings-popover"
      style={{ anchorName: "--settings-popover-anchor" }}
    >
      <Avatar name={user.name} />
      <div className="info">
        <div className="name">
          <p className="name">{user?.name}</p>
          {verifiedUser && (
            <div className="verification-badge">
              <CheckIcon />
            </div>
          )}
        </div>
        <p className="role">{user?.role}</p>
      </div>
      <ChevronDownIcon />
    </button>
  );
}

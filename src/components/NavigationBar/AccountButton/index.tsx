import "./style.css";

import { Activity } from "react";
import { useUser } from "../../../hooks/useUser";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import Avatar from "../../Avatar";

interface Props {
  expanded: boolean;
}

export default function AccountButton({ expanded }: Props) {
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
      <Activity mode={expanded ? "visible" : "hidden"}>
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
      </Activity>
    </button>
  );
}

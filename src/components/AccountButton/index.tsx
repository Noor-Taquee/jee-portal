import "./style.css";

import { useUser } from "../../hooks/useUser";

import type { ComponentPropsWithoutRef } from "react";

import Avatar from "./Avatar";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

type Props = ComponentPropsWithoutRef<"button">;

export default function AccountButton({ ...props }: Props) {
  const { user } = useUser();

  if (!user) return <div></div>;

  const verifiedUser = ["admin", "maintainer"].includes(user.role);

  return (
    <button
      id="account-button"
      {...props}
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

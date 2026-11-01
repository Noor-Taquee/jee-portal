import "./style.css";

import { Link } from "react-router-dom";
import { ArrowLeftIcon, VerifiedIcon } from "lucide-react";
import UserInfo from "./UserInfo";

interface Props {
  user: {
    username: string;
    name: string;
    role: string;
    visibility: "none" | "users" | "public";
  };
}

export default function UserProfile({ user }: Props) {
  return (
    <div id="user-profile">
      <header>
        <Link to="/">
          <ArrowLeftIcon />
        </Link>
        <h1>
          {user.username}
          <VerifiedIcon id="verified-profile-icon" />
        </h1>
      </header>
      <UserInfo user={user} />
      <div></div>
    </div>
  );
}

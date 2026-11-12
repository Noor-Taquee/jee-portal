import "./style.css";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  const verifiedUser = ["admn", "maintainr"].includes(user.role);

  return (
    <div id="user-profile">
      <Helmet>
        <link
          rel="canonical"
          href={`https://jee-portal.pages.dev/user/${encodeURIComponent(user.username)}`}
        />
        <title>
          {user.name
            ? `${user.name} - ${user.username}`
            : "Profile | JEE Portal"}
        </title>
        {user?.visibility === "public" && (
          <>
            <meta
              name="description"
              content={`View ${user.name}'s JEE Portal profile.`}
            />
            <meta
              property="og:title"
              content={`${user.username} - Profile | JEE Portal`}
            />
            <meta
              property="og:description"
              content={`View ${user.name}'s JEE Portal profile.`}
            />
            <meta
              property="og:url"
              content={`https://jee-portal.pages.dev/user/${encodeURIComponent(user.username)}`}
            />
            <meta
              name="twitter:title"
              content={`${user.username} - Profile | JEE Portal`}
            />
            <meta
              name="twitter:description"
              content={`View ${user.name}'s JEE Portal profile.`}
            />
          </>
        )}
      </Helmet>

      <header className="panel-header">
        <div className="panel-name">
          <Link to="/">
            <ArrowLeftIcon />
          </Link>
          <h1>
            {user.username}
            {verifiedUser && <VerifiedIcon id="verified-profile-icon" />}
          </h1>
        </div>
      </header>
      <UserInfo user={user} />
    </div>
  );
}

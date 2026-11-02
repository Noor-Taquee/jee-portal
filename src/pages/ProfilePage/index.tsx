import "./style.css";

import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import ConditionalComponent from "../../components/ConditionalComponent";
import PageLoader from "../../components/PageLoader";
import UserProfile from "./UserProfile";
import UserNotFound from "./UserNotFound";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const [loading, setLoading] = useState(false);
  const [searchedUser, setSearchUser] = useState<{
    username: string;
    name: string;
    role: string;
    visibility: "none" | "users" | "public";
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/searchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        setSearchUser(data.user);
      } catch {
        setSearchUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  return (
    <div
      id="profile-page"
      className="app-panel"
    >
      <Helmet>
        {searchedUser?.visibility === "public" ? (
          <link
            rel="canonical"
            href={`https://jee-portal.pages.dev/user/${encodeURIComponent(searchedUser.username)}`}
          />
        ) : (
          <meta
            name="robots"
            content="noindex, nofollow"
          />
        )}
        <title>
          {username
            ? `${username} - Profile | JEE Portal`
            : "Profile | JEE Portal"}
        </title>
        {searchedUser?.visibility === "public" && (
          <>
            <meta
              name="description"
              content={`View ${searchedUser.name}'s JEE Portal profile.`}
            />
            <meta
              property="og:title"
              content={`${searchedUser.username} - Profile | JEE Portal`}
            />
            <meta
              property="og:description"
              content={`View ${searchedUser.name}'s JEE Portal profile.`}
            />
            <meta
              property="og:url"
              content={`https://jee-portal.pages.dev/user/${encodeURIComponent(searchedUser.username)}`}
            />
            <meta
              name="twitter:title"
              content={`${searchedUser.username} - Profile | JEE Portal`}
            />
            <meta
              name="twitter:description"
              content={`View ${searchedUser.name}'s JEE Portal profile.`}
            />
          </>
        )}
      </Helmet>

      <ConditionalComponent
        show={!loading}
        fallback={<PageLoader />}
      >
        {searchedUser ? (
          <UserProfile user={searchedUser} />
        ) : (
          <UserNotFound username={username} />
        )}
      </ConditionalComponent>
    </div>
  );
}

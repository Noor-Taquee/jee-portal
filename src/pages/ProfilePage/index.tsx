import "./style.css";

import { useEffect, useState } from "react";

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
      } catch (error) {
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

import "./style.css";

import { useEffect, useState } from "react";
import UserSearchCard from "./UserSearchCard";
import UserSearchError from "./Error";
import ConditionalComponent from "../../../../components/ConditionalComponent";
import PageLoader from "../../../../components/PageLoader";

type SearchUser = {
  username: string;
  name: string;
  role: string;
  visibility: "all" | "users" | "none";
};

interface Props {
  query: string;
}

export default function UserSearchResults({ query }: Props) {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `/api/search/user/byAll?search=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        const data = (await response.json()) as {
          success: boolean;
          result?: SearchUser[];
        };

        if (!response.ok || !data.success) {
          throw new Error("Unable to search users");
        }

        setUsers(data.result ?? []);
        setStatus("success");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    };

    void fetchUsers();
    return () => controller.abort();
  }, [query]);

  if (status === "loading") return <PageLoader />;
  if (users.length === 0) return <NoUser query={query}></NoUser>;

  return (
    <ConditionalComponent
      show={status !== "error"}
      fallback={<UserSearchError />}
    >
      <div id="user-search-results">
        {users.map((user) => (
          <UserSearchCard
            key={user.username}
            searchUser={user}
          />
        ))}
      </div>
    </ConditionalComponent>
  );
}

function NoUser({ query }: { query: string }) {
  return (
    <div className="error-states">
      <p>
        {/* oxlint-disable-next-line react/no-unescaped-entities */}
        No users found for "<strong>{query}</strong>"
      </p>
    </div>
  );
}

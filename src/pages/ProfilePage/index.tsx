import "./style.css";

import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ConditionalComponent from "../../components/ConditionalComponent";
import PageLoader from "../../components/PageLoader";
import UserProfile from "./UserProfile";
import UserNotFound from "./UserNotFound";

type SearchedUser = {
  username: string;
  name: string;
  role: string;
  visibility: "none" | "users" | "public";
}

type Result = {
  user?: SearchedUser;
  visible: boolean;
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const response = useFetch<Result>(`/api/search/user/byUsername?search=${username}`);

  return (
    <div
      id="profile-page"
      className="app-panel"
    >
      <ConditionalComponent
        show={!response.loading}
        fallback={<PageLoader />}
      >
        {response.result?.user ? (
          <UserProfile user={response.result.user} />
        ) : (
          <UserNotFound username={username} />
        )}
      </ConditionalComponent>
    </div>
  );
}

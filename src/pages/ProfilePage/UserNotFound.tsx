import { Link } from "react-router-dom";

interface Props {
  username?: string | undefined;
}

export default function UserNotFound({ username }: Props) {
  return (
    <div id="user-not-found-div">
      {username && username.length > 0 ? (
        <>
          <p>
            Could not find any user with the username <span>{username}</span>
          </p>
          <p>Try searching a different username</p>
        </>
      ) : (
        <p>Enter a valid username</p>
      )}
      <Link
        className="cta-1"
        to="/"
      >
        <p>Go to home</p>
      </Link>
    </div>
  );
}

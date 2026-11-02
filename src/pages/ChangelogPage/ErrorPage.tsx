import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      className="changelog-error"
      role="alert"
    >
      <h1>Changelog unavailable</h1>
      <p>We couldn&apos;t load the release notes. Please try again later.</p>
      <Link
        to="/"
        className="cta-1"
      >
        <p>Go back home</p>
      </Link>
    </div>
  );
}

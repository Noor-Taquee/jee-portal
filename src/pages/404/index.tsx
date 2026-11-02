import "./style.css";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PageNotFound404() {
  return (
    <div
      id="page-not-found-404"
      className="app-panel"
    >
      <Helmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
        <title>404 - Page not found</title>
      </Helmet>

      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <Link
        className="cta-1"
        to={"/"}
      >
        <p>Go back home</p>
      </Link>
    </div>
  );
}

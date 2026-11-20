import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PlusIcon } from "lucide-react";

export default function AdminContent() {
  return (
    <div
      id="admin-page"
      className="app-panel"
    >
      <Helmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
        <title>Admin</title>
      </Helmet>

      <header className="panel-header">
        <h1>Admin</h1>
      </header>

      <Link
        to={"/admin/new/question"}
        className="cta-1"
      >
        <PlusIcon />
        <p>Add Question</p>
      </Link>
    </div>
  );
}

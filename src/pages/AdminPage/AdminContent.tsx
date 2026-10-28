import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

export default function AdminContent() {
  return (
    <div className="app-panel">
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

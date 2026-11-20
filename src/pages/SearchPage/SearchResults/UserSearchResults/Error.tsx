import { CloudAlertIcon } from "lucide-react";

export default function UserSearchError() {
  return (
    <div className="error-state">
      <div className="icon-holder">
        <CloudAlertIcon />
      </div>
      <p>Unable to search users. Please try again.</p>
    </div>
  );
}

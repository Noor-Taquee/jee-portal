import "./style.css";

import { LoaderIcon } from "lucide-react";

export default function LoadingDialogue() {
  return (
    <div
      id="loading-dialogue"
      className="upload-dialogue"
    >
      <LoaderIcon className="spin" />
      <h2 className="header">Uploading</h2>
    </div>
  );
}

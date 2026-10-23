import "./style.css";

import { LoaderIcon } from "lucide-react";

export default function LoadingDialog() {
  return (
    <div
      id="loading-dialog"
      className="upload-dialog"
    >
      <LoaderIcon className="spin" />
      <h2 className="header">Uploading</h2>
    </div>
  );
}

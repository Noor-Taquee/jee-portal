import "./style.css";

import { CircleXIcon } from "lucide-react";

interface Props {
  failureMessage: string;
  handleUpload: () => void;
  discard: () => void;
}

export default function FailureDialogue({
  failureMessage,
  handleUpload,
  discard,
}: Props) {
  return (
    <div
      id="failure-dialogue"
      className="upload-dialogue"
    >
      <CircleXIcon />

      <h2 className="header">Upload Failed</h2>
      <small>{failureMessage}</small>

      <div className="button-container">
        <button
          className="cta-1"
          onClick={discard}
        >
          <p>Discard</p>
        </button>

        {failureMessage === "network" && (
          <button
            className="cta-1"
            onClick={handleUpload}
          >
            <p>Retry</p>
          </button>
        )}
      </div>
    </div>
  );
}

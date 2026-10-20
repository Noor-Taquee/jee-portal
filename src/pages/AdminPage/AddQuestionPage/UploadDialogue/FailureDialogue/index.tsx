import "./style.css";

import { CircleXIcon } from "lucide-react";

interface Props {
  failure: { message: string; cause?: string };
  handleUpload: () => void;
  discard: () => void;
}

export default function FailureDialogue({
  failure,
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
      <small>{failure.message}</small>

      {failure.cause && (
        <details id="upload-failure-details">
          <summary>Details</summary>
          <div className="content">
            <div>
              <p>{failure.cause}</p>
            </div>
          </div>
        </details>
      )}

      <div className="button-container">
        <button
          className="cta-1"
          onClick={discard}
        >
          <p>Discard</p>
        </button>

        {failure.message === "network" && (
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

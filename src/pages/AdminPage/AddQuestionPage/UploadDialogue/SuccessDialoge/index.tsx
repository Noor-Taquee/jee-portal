import { CircleCheckIcon } from "lucide-react";
import "./style.css";

interface Props {
  discard: () => void;
}

export default function SuccessDialogue({ discard }: Props) {
  return (
    <div
      id="success-dialogue"
      className="upload-dialogue"
    >
      <CircleCheckIcon />
      <h2 className="header">Upload Successful</h2>
      <small>The question has been successfully uploaded.</small>

      <div className="button-container">
        <button
          className="cta-1"
          onClick={discard}
        >
          <p>Close</p>
        </button>
      </div>
    </div>
  );
}

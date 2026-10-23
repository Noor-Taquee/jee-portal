import { CircleCheckIcon } from "lucide-react";
import "./style.css";

interface Props {
  discard: () => void;
}

export default function SuccessDialog({ discard }: Props) {
  return (
    <div
      id="success-dialog"
      className="upload-dialog"
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

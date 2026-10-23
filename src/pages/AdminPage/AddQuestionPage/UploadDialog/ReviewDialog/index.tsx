// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";

import Task from "../../../../../components/Task";

interface Props {
  handleUpload: () => void;
  discard: () => void;
}

export default function ReviewDialog({ discard, handleUpload }: Props) {
  const [reviewChecklist, setReviewChecklist] = useState({
    originality: false,
    correctness: false,
  });

  return (
    <div
      id="review-dialog"
      className="upload-dialog"
    >
      <h2 className="header">Upload</h2>
      <small>Review changes</small>

      <div id="review-checklist">
        <Task
          header="Originality"
          description="The question is original and not a duplicate of an existing question."
          onCheck={() => {
            setReviewChecklist((p) => {
              return { ...p, originality: true };
            });
          }}
          onUncheck={() => {
            setReviewChecklist((p) => {
              return { ...p, originality: false };
            });
          }}
        />

        <Task
          header="Correctness"
          description="The question is factually accurate and well-structured."
          onCheck={() => {
            setReviewChecklist((p) => {
              return { ...p, correctness: true };
            });
          }}
          onUncheck={() => {
            setReviewChecklist((p) => {
              return { ...p, correctness: false };
            });
          }}
        />
      </div>

      <caption id="review-checklist-warning">
        Please ensure that all the above points are checked before uploading.
      </caption>

      <div className="button-container">
        <button
          className="cta-1"
          onClick={discard}
        >
          <p>Discard</p>
        </button>
        <button
          className="cta-1"
          onClick={handleUpload}
          disabled={
            !reviewChecklist.originality || !reviewChecklist.correctness
          }
        >
          <p>Upload</p>
        </button>
      </div>
    </div>
  );
}

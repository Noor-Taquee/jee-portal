export default function ReviewQuestionTypePopover() {
  return (
    <div
      id="review-question-type-popover"
      className="popover-card down left-level"
      popover="auto"
      style={{ positionAnchor: "--review-question-popover-anchor" }}
    >
      <button className="popover-entry">
        <p>MCQ (Single Correct Answer)</p>
      </button>
      <button className="popover-entry">
        <p>Numerical</p>
      </button>
    </div>
  );
}

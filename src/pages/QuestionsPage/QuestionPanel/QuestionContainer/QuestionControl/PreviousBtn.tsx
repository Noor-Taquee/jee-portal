interface PreviousBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
}

export default function PreviousBtn({
  questionNo,
  setQuestionNo,
}: PreviousBtnProps) {
  return (
    <button
      className={`question-control-btn ${questionNo <= 1 ? "disabled" : ""}`}
      onClick={() => {
        if (questionNo <= 1) return;
        setQuestionNo((p) => p - 1);
      }}
    >
      <i className="ph-bold ph-caret-left"></i>
      <p>{"Previous"}</p>
    </button>
  );
}

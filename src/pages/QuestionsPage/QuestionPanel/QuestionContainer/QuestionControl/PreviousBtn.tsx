import ActionBtn from "../../../../../components/ActionBtn";
import { ChevronLeft } from "lucide-react";

interface PreviousBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
}

export default function PreviousBtn({
  questionNo,
  setQuestionNo,
}: PreviousBtnProps) {
  return (
    <ActionBtn
      title="Previous question"
      className={`question-control-btn ${questionNo <= 1 ? "disabled" : ""}`}
      onClick={() => {
        if (questionNo <= 1) return;
        setQuestionNo((p) => p - 1);
      }}
    >
      <ChevronLeft />
      <p>{"Previous"}</p>
    </ActionBtn>
  );
}

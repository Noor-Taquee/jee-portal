import ActionBtn from "../../../../../components/ActionBtn";
import { ChevronLeft } from "lucide-react";

interface PreviousBtnProps {
  questionNo: number;
  setQuestionNo: (n: number) => void;
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
        setQuestionNo(questionNo - 1);
      }}
    >
      <ChevronLeft />
      <p>{"Previous"}</p>
    </ActionBtn>
  );
}

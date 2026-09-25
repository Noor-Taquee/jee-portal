import { useExamSession } from "../../../../../hooks/useExamSession";

import type { OptionID } from "../../../../../core/question";

import ActionBtn from "../../../../../components/ActionBtn";
import { ChevronRight } from "lucide-react";

interface SaveBtnProps {
  questionNo: number;
  setQuestionNo: (n: number) => void;
  answer: OptionID | OptionID[] | null;
}

export default function SaveBtn({
  questionNo,
  setQuestionNo,
  answer,
}: SaveBtnProps) {
  const examSession = useExamSession();

  const lastQuestion = questionNo >= 75;

  return (
    <ActionBtn
      title={lastQuestion ? "Save" : "Save & Next"}
      className={`question-control-btn ${questionNo >= 75 ? "" : ""}`}
      onClick={() => {
        if (!examSession.candidateResponse) return;

        const key = questionNo;
        const res = examSession.candidateResponse.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.submittedAnswer = answer;
          examSession.candidateResponse.set(key, res);
          examSession.setCandidateResponse(
            new Map(examSession.candidateResponse)
          );
        }

        if (questionNo >= 75) return;
        setQuestionNo(questionNo + 1);
      }}
    >
      {!lastQuestion && <ChevronRight />}
      <p>{lastQuestion ? "Save" : "Save & Next"}</p>
    </ActionBtn>
  );
}

import type { OptionID } from "../../../../../core/data";

import ActionBtn from "../../../../../components/ActionBtn";
import { useExamSession } from "../../../../../hooks/useExamSession";

interface SaveBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
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
        setQuestionNo((p) => p + 1);
      }}
    >
      {!lastQuestion && <i className="ph-bold ph-caret-right"></i>}
      <p>{lastQuestion ? "Save" : "Save & Next"}</p>
    </ActionBtn>
  );
}

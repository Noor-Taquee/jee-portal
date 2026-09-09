import type { OptionID } from "../../../../../core/data";

import ActionBtn from "../../../../../components/ActionBtn";
import { useExamSession } from "../../../../../hooks/useExamData";

interface MFRBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  answer: OptionID | OptionID[] | null;
}

/** "Marked for review" */
export default function MFRBtn({
  questionNo,
  setQuestionNo,
  answer,
}: MFRBtnProps) {
  const examSession = useExamSession();

  const isLastQuestion = questionNo >= 75;

  return (
    <ActionBtn
      title={isLastQuestion ? "Mark for review" : "Mark for review & Next"}
      className={`question-control-btn ${answer ? "" : ""}`}
      onClick={() => {
        if (!answer || !examSession.candidateResponse) return;

        const key = questionNo;
        const res = examSession.candidateResponse.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.review = true;
          examSession.candidateResponse.set(key, res);
          examSession.setCandidateResponse(
            new Map(examSession.candidateResponse)
          );
        }

        if (isLastQuestion) return;
        setQuestionNo((p) => p + 1);
      }}
    >
      <p>{isLastQuestion ? "Mark for review" : "Mark for review & Next"}</p>
    </ActionBtn>
  );
}

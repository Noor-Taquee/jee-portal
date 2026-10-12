import type { OptionID } from "../../../../../core/question";

import ActionBtn from "../../../../../components/ActionBtn";
import { useExamSession } from "../../../../../hooks/useExamSession";

interface MFRBtnProps {
  questionNo: number;
  setQuestionNo: (n: number) => void;
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
        setQuestionNo(questionNo + 1);
      }}
    >
      <p>{isLastQuestion ? "Mark for review" : "Mark for review & Next"}</p>
    </ActionBtn>
  );
}

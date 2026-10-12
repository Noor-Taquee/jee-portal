import { useExamSession } from "../../../../../hooks/useExamSession";

import type { OptionID } from "../../../../../core/question";

import ActionBtn from "../../../../../components/ActionBtn";

interface AMFRBtnProps {
  questionNo: number;
  setQuestionNo: (n: number) => void;
  answer: OptionID | OptionID[] | null;
}

/** Submits the answer and marks for review  */
export default function AMFRBtn({
  questionNo,
  setQuestionNo,
  answer,
}: AMFRBtnProps) {
  const examSession = useExamSession();

  const isLastQuestion = questionNo >= 75;

  return (
    <ActionBtn
      title="Save & Mark for review"
      className={`question-control-btn ${answer ? "" : ""}`}
      onClick={() => {
        if (!answer || !examSession.candidateResponse) return;

        const key = questionNo;
        const res = examSession.candidateResponse.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.review = true;
          res.submittedAnswer = answer;
          examSession.candidateResponse.set(key, res);
          examSession.setCandidateResponse(
            new Map(examSession.candidateResponse)
          );
        }

        if (isLastQuestion) return;
        setQuestionNo(questionNo + 1);
      }}
    >
      <p>{"Save & Mark for review"}</p>
    </ActionBtn>
  );
}

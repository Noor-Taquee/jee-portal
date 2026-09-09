import { useExamSession } from "../../../../../hooks/useExamData";

import ActionBtn from "../../../../../components/ActionBtn";

interface ClearBtnProps {
  questionNo: number;
  setAnswer: React.Dispatch<React.SetStateAction<string | string[] | null>>;
}

/** Clears the selected & submitted answer */
export default function ClearBtn({ questionNo, setAnswer }: ClearBtnProps) {
  const examSession = useExamSession();

  return (
    <ActionBtn
      title="Clear Response"
      className="question-control-btn"
      onClick={() => {
        if (!examSession.candidateResponse) return;

        const key = questionNo;
        const res = examSession.candidateResponse.get(key);
        if (res) {
          res.visited = true;
          res.answer = null;
          res.submittedAnswer = null;
          res.review = false;
          examSession.candidateResponse.set(key, res);
          examSession.setCandidateResponse(
            new Map(examSession.candidateResponse)
          );
        }

        setAnswer(null);
      }}
    >
      <p>{"Clear Response"}</p>
    </ActionBtn>
  );
}

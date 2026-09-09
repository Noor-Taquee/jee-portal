import "./style.css";

import { useState } from "react";
import { useExamSession } from "../../../../hooks/useExamData";

import QuestionBox from "../../../../components/QuestionBox";
import ButtonWrapper from "./ButtonWrapper";

interface QuestionTableProps {
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
}

/** The panel which shows the questions */
export default function QuestionTable({ setQuestionNo }: QuestionTableProps) {
  const examSession = useExamSession();

  const [page, setPage] = useState<1 | 2 | 3>(1);
  const start = 25 * (page - 1);
  const end = start + 25;

  if (!examSession.candidateResponse) return <div></div>;

  return (
    <div id="question-table-wrapper">
      <div id="table-subject-label">
        <p>
          {page === 1 && "Physics"}
          {page === 2 && "Chemistry"}
          {page === 3 && "Mathematics"}
        </p>
      </div>
      <div id="question-table">
        {[...examSession.candidateResponse.entries()]
          .slice(start, end)
          .map(([i, o]) => (
            <QuestionBox
              key={`box-${i}`}
              className={
                o.visited
                  ? o.answer
                    ? o.review
                      ? o.submittedAnswer
                        ? "ans-marked-for-review"
                        : "marked-for-review"
                      : "answered"
                    : "unanswered"
                  : "unread"
              }
              number={i}
              onClick={() => setQuestionNo(i)}
            />
          ))}
      </div>
      <ButtonWrapper
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

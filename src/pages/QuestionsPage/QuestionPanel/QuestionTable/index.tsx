import { useState } from "react";
import type { ResponseData } from "../../../../services";

import "./style.css";

import QuestionBox from "../../../../components/QuestionBox";
import ButtonWrapper from "./ButtonWrapper";

interface QuestionTableProps {
  responseData: ResponseData;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
}

/** The panel which shows the questions */
export default function QuestionTable({
  responseData,
  setQuestionNo,
}: QuestionTableProps) {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const start = 25 * (page - 1);
  const end = start + 25;

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
        {[...responseData.entries()].slice(start, end).map(([i, o]) => (
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

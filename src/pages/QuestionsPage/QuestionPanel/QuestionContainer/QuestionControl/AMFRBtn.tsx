import type { OptionID } from "../../../../../core/data";
import type { ResponseData } from "../../../../../services";

interface AMFRBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  answer: OptionID | OptionID[] | null;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

/** Submits the answer and mar  */
export default function AMFRBtn({
  questionNo,
  setQuestionNo,
  answer,
  responseData,
  setResponseData,
}: AMFRBtnProps) {
  const lastQuestion = questionNo >= 75;

  return (
    <button
      className={`question-control-btn ${answer ? "" : ""}`}
      onClick={() => {
        if (!answer) return;

        const key = questionNo;
        const res = responseData.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.review = true;
          res.submittedAnswer = answer;
          responseData.set(key, res);
          setResponseData(new Map(responseData));
        }

        if (lastQuestion) return;
        setQuestionNo((p) => p + 1);
      }}
    >
      <p>{"Save & Mark for review"}</p>
    </button>
  );
}

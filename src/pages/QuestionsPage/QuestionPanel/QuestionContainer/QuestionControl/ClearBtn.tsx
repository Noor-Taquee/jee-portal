import type { ResponseData } from "../../../../../services";

interface ClearBtnProps {
  questionNo: number;
  setAnswer: React.Dispatch<React.SetStateAction<string | string[] | null>>;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

/** Clears the selected and submitted answer */
export default function ClearBtn({
  questionNo,
  setAnswer,
  responseData,
  setResponseData,
}: ClearBtnProps) {
  return (
    <button
      className="question-control-btn"
      onClick={() => {
        const key = questionNo;
        const res = responseData.get(key);
        if (res) {
          res.visited = true;
          res.answer = null;
          res.submittedAnswer = null;
          res.review = false;
          responseData.set(key, res);
          setResponseData(new Map(responseData));
        }

        setAnswer(null);
      }}
    >
      <p>{"Clear Response"}</p>
    </button>
  );
}

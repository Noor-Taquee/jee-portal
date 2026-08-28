import type { OptionID } from "../../../../../core/data";
import type { ResponseData } from "../../../../../services";

import ActionBtn from "../../../../../components/ActionBtn";

interface SaveBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  answer: OptionID | OptionID[] | null;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

export default function SaveBtn({
  questionNo,
  setQuestionNo,
  answer,
  responseData,
  setResponseData,
}: SaveBtnProps) {
  const lastQuestion = questionNo >= 75;

  return (
    <ActionBtn
      className={`question-control-btn ${questionNo >= 75 ? "" : ""}`}
      onClick={() => {
        const key = questionNo;
        const res = responseData.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.submittedAnswer = answer;
          responseData.set(key, res);
          setResponseData(new Map(responseData));
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

import type { OptionID } from "../../../../../core/data";
import type { ResponseData } from "../../../../../services";

import ActionBtn from "../../../../../components/ActionBtn";

interface MFRBtnProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  answer: OptionID | OptionID[] | null;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

/** "Marked for review" */
export default function MFRBtn({
  questionNo,
  setQuestionNo,
  answer,
  responseData,
  setResponseData,
}: MFRBtnProps) {
  const lastQuestion = questionNo >= 75;

  return (
    <ActionBtn
      className={`question-control-btn ${answer ? "" : ""}`}
      onClick={() => {
        if (!answer) return;

        const key = questionNo;
        const res = responseData.get(key);
        if (res) {
          res.visited = true;
          res.answer = answer;
          res.review = true;
          responseData.set(key, res);
          setResponseData(new Map(responseData));
        }

        if (lastQuestion) return;
        setQuestionNo((p) => p + 1);
      }}
    >
      <p>{lastQuestion ? "Mark for review" : "Mark for review & Next"}</p>
    </ActionBtn>
  );
}

// oxlint-disable max-lines-per-function

import type { ResponseData } from "../../../../../services";

import "./style.css";

interface QuestionControlProps {
  questionNo: number;
  setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: 1 | 2 | 3 | 4 | null;
  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
}

export default function QuestionControl({
  questionNo,
  setQuestionNo,
  selectedOption,
  responseData,
  setResponseData,
}: QuestionControlProps) {
  return (
    <div id="question-control">
      <button
        className={`question-control-btn ${questionNo <= 1 ? "disabled" : ""}`}
        onClick={() => {
          if (questionNo <= 1) return;
          setQuestionNo((p) => p - 1);
        }}
      >
        <i className="ph-bold ph-caret-left"></i>
        <p>{"Previous"}</p>
      </button>

      <div id="separator-div">
        <button
          className={`question-control-btn ${selectedOption ? "" : ""}`}
          onClick={() => {
            if (!selectedOption) return;

            const key = questionNo;
            const res = responseData.get(key);
            if (res) {
              res.visited = true;
              res.option = selectedOption;
              res.review = true;
              responseData.set(key, res);
              setResponseData(responseData);
            }
          }}
        >
          <p>{"Mark for review"}</p>
        </button>
        <button
          className={`question-control-btn ${questionNo >= 75 ? "" : ""}`}
          onClick={() => {
            const key = questionNo;
            const res = responseData.get(key);
            if (res) {
              res.visited = true;
              res.option = selectedOption;
              responseData.set(key, res);
              setResponseData(responseData);
            }

            if (questionNo >= 75) return;
            setQuestionNo((p) => p + 1);
          }}
        >
          <i className="ph-bold ph-caret-right"></i>
          <p>{questionNo === 75 ? "Save" : "Save & Next"}</p>
        </button>
      </div>
    </div>
  );
}

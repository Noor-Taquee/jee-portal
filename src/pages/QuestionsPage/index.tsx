import type { InnerRoute } from "../../utils/hash-handler";

import type { QuestionData } from "../../core/data";
import type { ResponseData } from "../../services";

import "./style.css";

import QuestionPanel from "./QuestionPanel";
import Header from "./Header";

interface QuestionPanelProps {
  questionData: QuestionData[] | null;

  responseData: ResponseData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;

  startTime: Date;
  /** Test Duration in _Milliseconds_ */
  testDuration: number;
  route?: InnerRoute;
}

export default function QuestionsPage({
  questionData,
  responseData,
  setResponseData,
  startTime,
  testDuration,
}: QuestionPanelProps) {
  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="app-panel"
      id="questions-page"
    >
      <Header
        startTime={startTime}
        testDuration={testDuration}
      />
      <QuestionPanel
        questionData={questionData}
        responseData={responseData}
        setResponseData={setResponseData}
      />
    </div>
  );
}

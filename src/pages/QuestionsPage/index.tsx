import type { InnerRoute } from "../../utils/hash-handler";

import type { QuestionData } from "../../core/data";

import "./style.css";

import Header from "./Header";
import QuestionPanel from "./QuestionPanel";

interface QuestionPanelProps {
  route: InnerRoute;
  questionData: QuestionData[] | null;
}

export default function QuestionsPage({
  route,
  questionData,
}: QuestionPanelProps) {
  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="app-panel"
      id="questions-page"
    >
      <Header />
      <QuestionPanel
        route={route}
        questionData={questionData}
      />
    </div>
  );
}

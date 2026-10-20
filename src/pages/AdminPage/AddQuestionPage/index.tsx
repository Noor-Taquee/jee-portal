import "./style.css";

import { useState } from "react";

import QuestionContainer from "./QuestionContainer";
import QuestionInfo from "./QuestionInfo";
import UploadPopover from "./UploadDialogue";

export type ReviewQuestion = {
  /**
   * | id |        name     |
   * |:---|:----------------|
   * | 1  | Multiple Choice |
   * | 6  |    Numerical    |
   */
  type: 1 | 6;

  question_text: string;

  options: null | [string, string, string, string];

  correct_answer: number | "A" | "B" | "C" | "D";

  numerical_tolerance: number;

  topics: number[];

  exam_id: number | null;
};

export type SetQuestion = React.Dispatch<
  React.SetStateAction<ReviewQuestion | null>
>;

export default function AddQuestionPage() {
  const [uploadDialogue, setUploadDialogue] = useState(false);

  const [question, setQuestion] = useState<ReviewQuestion | null>({
    type: 1,
    question_text: "Question ...",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct_answer: "A",
    numerical_tolerance: 0,
    topics: [],
    exam_id: null,
  });

  return (
    <div
      className="app-panel"
      id="add-question-page"
    >
      <QuestionContainer
        question={question}
        setQuestion={setQuestion}
      />
      <QuestionInfo
        question={question}
        setQuestion={setQuestion}
        setUploadDialoge={setUploadDialogue}
      />

      <UploadPopover
        question={question}
        uploadDialogue={uploadDialogue}
        setUploadDialogue={setUploadDialogue}
      />
    </div>
  );
}

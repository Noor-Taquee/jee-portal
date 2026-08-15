import type { QuestionData } from "../../../../../core/data";

import "./style.css";

interface HeaderProps {
  question: QuestionData;
}

export default function Header({ question }: HeaderProps) {
  return (
    <div id="question-container-header">
      <p id="subject-label">{question.subject}</p>
      <p id="type-label">
        {question.type === "single-choice" && "Single Correct Answer"}
        {question.type === "numerical" && "Numerical Value Answer"}
      </p>
      <div id="marks-indicator">
        <p>{"Marks: "}</p>
        <span className="marks-indicator positive">{"+4"}</span>
        <span className="separator"></span>
        <span className="marks-indicator negative">{"-1"}</span>
      </div>
    </div>
  );
}

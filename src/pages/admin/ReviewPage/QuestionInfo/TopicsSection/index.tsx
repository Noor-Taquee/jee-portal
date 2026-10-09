import "./style.css";

import type { Questions } from "../..";
import { PlusIcon } from "lucide-react";

interface Props {
  question: Questions;
}

export default function TopicsSection({ question }: Props) {
  return (
    <div
      className="review-question-info-section"
      id="topic-section"
    >
      <h3 className="section-header">Topics</h3>
      <div id="topic-holder">
        {question.topics.map((topic, index) => (
          <p
            className="topic-pill"
            key={`${topic}-${index}`}
          >
            {topic}
          </p>
        ))}
        <button id="add-topic-button">
          <PlusIcon />
          <p>Add</p>
        </button>
      </div>
    </div>
  );
}

import "./style.css";

import { useState } from "react";

import type { Topic, Topics } from "../../../../../../hooks/useTopicsMap";
import type { ReviewQuestion, SetQuestion } from "../../../index";

import SubjectTopics from "./SubjectTopics";

interface Props {
  topics: Topics | undefined;
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function TopicPickerPopover({
  topics,
  question,
  setQuestion,
}: Props) {
  const [selectedTopics, setSelectedTopics] = useState(question.topics);

  const physicsTopics: Topic[] = [];
  const chemistryTopics: Topic[] = [];
  const mathsTopics: Topic[] = [];

  if (!topics) return <div></div>;

  for (const topic of topics.values()) {
    const r = {
      Physics: physicsTopics,
      Chemistry: chemistryTopics,
      Mathematics: mathsTopics,
    };
    if (
      topic.subject &&
      ["Physics", "Chemistry", "Mathematics"].includes(topic.subject)
    ) {
      r[topic.subject].push(topic);
    }
  }

  return (
    <div
      id="review-topic-picker-popover"
      style={{ positionAnchor: "--review-topic-picker-popover-anchor" }}
      popover="auto"
    >
      <div id="subject-container-wrapper">
        <SubjectTopics
          subjectName="Physics"
          subjectTopics={physicsTopics}
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
        />
        <SubjectTopics
          subjectName="Chemistry"
          subjectTopics={chemistryTopics}
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
        />
        <SubjectTopics
          subjectName="Mathematics"
          subjectTopics={mathsTopics}
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
        />
      </div>

      <div className="footer">
        <p>
          {selectedTopics.length} {selectedTopics.length === 1 ? "Topic" : "Topics"} Selected
        </p>
        <button
          onClick={() => {
            setQuestion({
              ...question,
              topics: selectedTopics,
            });
          }}
          className="cta-1"
          popoverTarget="review-topic-picker-popover"
        >
          <p>Save</p>
        </button>
      </div>
    </div>
  );
}

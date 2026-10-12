// oxlint-disable max-lines-per-function

import "./style.css";

import type { Topic, Topics } from "../../../../../../hooks/useTopicsMap";

import SubjectTopics from "./SubjectTopics";
import { useState } from "react";
import { useReview } from "../../../../../../hooks/useReview";

interface Props {
  topicMap: Topics | undefined;
}

export default function TopicPickerPopover({ topicMap }: Props) {
  const { currentQuestion, updateQuestion } = useReview();

  const [topics, setTopics] = useState(currentQuestion?.topics || []);

  const physicsTopics: Topic[] = [];
  const chemistryTopics: Topic[] = [];
  const mathsTopics: Topic[] = [];

  if (!currentQuestion || !topicMap) return <div></div>;

  for (const topic of topicMap.values()) {
    const r = {
      Physics: physicsTopics,
      Chemistry: chemistryTopics,
      Mathematics: mathsTopics,
    };
    r[topic.subject].push(topic);
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
          topics={topics}
          setTopics={setTopics}
        />
        <SubjectTopics
          subjectName="Chemistry"
          subjectTopics={chemistryTopics}
          topics={topics}
          setTopics={setTopics}
        />
        <SubjectTopics
          subjectName="Mathematics"
          subjectTopics={mathsTopics}
          topics={topics}
          setTopics={setTopics}
        />
      </div>

      <button
        onClick={() => {
          updateQuestion({
            ...currentQuestion,
            topics: topics,
          });
        }}
        popoverTarget="review-topic-picker-popover"
      >
        <p>save</p>
      </button>
    </div>
  );
}

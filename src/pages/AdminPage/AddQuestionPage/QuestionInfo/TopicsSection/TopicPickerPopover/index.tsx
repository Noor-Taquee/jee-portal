// oxlint-disable max-lines-per-function

import "./style.css";

import { useState } from "react";

import type { Topic, Topics } from "../../../../../../hooks/useTopicsMap";
import type { ReviewQuestion, SetQuestion } from "../../../index";

import SubjectTopics from "./SubjectTopics";

interface Props {
  topicMap: Topics | undefined;
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function TopicPickerPopover({
  topicMap,
  question,
  setQuestion,
}: Props) {
  const [topics, setTopics] = useState(question.topics);

  const physicsTopics: Topic[] = [];
  const chemistryTopics: Topic[] = [];
  const mathsTopics: Topic[] = [];

  if (!topicMap) return <div></div>;

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

      <div className="footer">
        <p>{topics.length} {topics.length === 1 ? "Topic" : "Topics"} Selected</p>
        <button
          onClick={() => {
            setQuestion({
              ...question,
              topics: topics,
            });
          }}
          className="cta-1"
          popoverTarget="review-topic-picker-popover"
        >
          <p>save</p>
        </button>
      </div>
    </div>
  );
}

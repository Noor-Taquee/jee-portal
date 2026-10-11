import "./style.css";

import type { Topic, Topics } from "../../../../../../hooks/useTopicsMap";

import SubjectTopics from "./SubjectTopics";

interface Props {
  topicMap: Topics;
}

export default function TopicPickerPopover({ topicMap }: Props) {
  const physicsTopics: Topic[] = [];
  const chemistryTopics: Topic[] = [];
  const mathsTopics: Topic[] = [];

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
      <SubjectTopics
        subjectName="Physics"
        subjectTopics={physicsTopics}
      />
      <SubjectTopics
        subjectName="Chemistry"
        subjectTopics={chemistryTopics}
      />
      <SubjectTopics
        subjectName="Mathematics"
        subjectTopics={mathsTopics}
      />
    </div>
  );
}

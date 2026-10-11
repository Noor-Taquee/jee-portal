import "./style.css";

import { useTopicsMap } from "../../../../../hooks/useTopicsMap";

import type { Questions } from "../..";

import { PlusIcon } from "lucide-react";
import TopicPickerPopover from "./TopicPickerPopover";

interface Props {
  question: Questions;
}

export default function TopicsSection({ question }: Props) {
  const { topicMap, loading } = useTopicsMap();

  if (loading || !topicMap) return <div>Loading Physics topics...</div>;

  return (
    <div
      className="review-question-info-section"
      id="topic-section"
    >
      <h3 className="section-header">Topics</h3>
      <div
        id="topic-holder"
        style={{ anchorName: "--review-topic-picker-popover-anchor" }}
      >
        {question.topics.map((topic, index) => (
          <p
            className="topic-pill"
            key={`${topic}-${index}`}
          >
            {topicMap.get(topic)?.name || "unknown"}
          </p>
        ))}
        <button
          id="add-topic-button"
          title="Add Topic"
          popoverTarget="review-topic-picker-popover"
        >
          <PlusIcon />
        </button>
        <TopicPickerPopover topicMap={topicMap} />
      </div>
    </div>
  );
}

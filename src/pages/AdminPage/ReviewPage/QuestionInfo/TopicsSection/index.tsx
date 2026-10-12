// oxlint-disable max-lines-per-function

import "./style.css";

import { useReview } from "../../../../../hooks/useReview";
import { useTopicsMap } from "../../../../../hooks/useTopicsMap";

import { PlusIcon } from "lucide-react";
import TopicPickerPopover from "./TopicPickerPopover";

export default function TopicsSection() {
  const { currentQuestion } = useReview();

  const { topicMap, loading } = useTopicsMap();

  if (!currentQuestion || currentQuestion.type !== 1) return <div></div>;

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
        {(loading || !topicMap) && (
          <>
            <p className="topic-pill loading"></p>
            <p className="topic-pill loading"></p>
          </>
        )}
        {!loading &&
          currentQuestion.topics.map((topic, index) => (
            <p
              className="topic-pill"
              key={`${topic}-${index}`}
            >
              {topicMap?.get(topic)?.name || "unknown"}
            </p>
          ))}
        {!loading && (
          <button
            id="add-topic-button"
            title="Add Topic"
            popoverTarget="review-topic-picker-popover"
          >
            <PlusIcon />
          </button>
        )}
        <TopicPickerPopover topicMap={topicMap} />
      </div>
    </div>
  );
}

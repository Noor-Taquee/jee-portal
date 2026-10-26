import "./style.css";

import { useTopicsMap } from "../../../../../hooks/useTopicsMap";

import type { ReviewQuestion, SetQuestion } from "../../index";

import { PlusIcon } from "lucide-react";
import TopicPickerPopover from "./TopicPickerPopover";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function TopicsSection({ question, setQuestion }: Props) {
  const { topicMap, loading } = useTopicsMap();

  return (
    <div
      className="review-question-info-section"
      id="topic-section"
    >
      <h4 className="section-header">Topics</h4>
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
          question.topics.map((topic, index) => (
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
        <TopicPickerPopover
          topicMap={topicMap}
          question={question}
          setQuestion={setQuestion}
        />
      </div>
    </div>
  );
}

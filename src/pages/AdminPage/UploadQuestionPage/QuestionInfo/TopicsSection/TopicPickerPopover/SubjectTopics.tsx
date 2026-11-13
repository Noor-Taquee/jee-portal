import type { Topic } from "../../../../../../hooks/useTopicsMap";

interface Props {
  subjectName: string;
  subjectTopics: Topic[];
  selectedTopics: number[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SubjectTopics({
  subjectName,
  subjectTopics,
  selectedTopics: topics,
  setSelectedTopics: setTopics,
}: Props) {
  return (
    <div className="subject-container">
      <p className="header">{subjectName}</p>
      {subjectTopics.map((topic) => (
        <button
          className={`topic-pill-choose ${topics.includes(topic.id) ? "selected" : ""}`}
          onClick={() => {
            setTopics((p) => {
              if (p.includes(topic.id)) {
                return p.filter((id) => id !== topic.id);
              }
              return [...p, topic.id];
            });
          }}
          key={`${topic.subject}-${topic.name}`}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
}

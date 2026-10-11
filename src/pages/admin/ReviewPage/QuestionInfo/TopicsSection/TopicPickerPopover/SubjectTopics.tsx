import type { Topic } from "../../../../../../hooks/useTopicsMap";

interface Props {
  subjectName: string;
  subjectTopics: Topic[];
}

export default function SubjectTopics({ subjectName, subjectTopics }: Props) {
  return (
    <div className="subject-container">
      <p className="header">{subjectName}</p>
      {subjectTopics.map((topic) => (
        <button
          className="topic-pill-choose"
          key={`${topic.subject}-${topic.name}`}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
}

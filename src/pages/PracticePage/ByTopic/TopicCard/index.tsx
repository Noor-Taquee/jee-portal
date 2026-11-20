import "./style.css";

import type { Topic } from "../../../../hooks/useTopicsMap";
import { Link } from "react-router-dom";

interface Props {
  topic: Topic;
}

export default function TopicCard({ topic }: Props) {
  return (
    <li className="topic-card">
      <Link to={`${String(topic.id)}-${topic.slug}`}>
        <p>{topic.name}</p>
      </Link>
    </li>
  );
}

import "./style.css";

import {
  useTopicsMap,
  type TopicSubject,
  type TopicUnit,
} from "../../../hooks/useTopicsMap";

import { Helmet } from "react-helmet-async";
import { ChevronsUpDownIcon } from "lucide-react";
import ConditionalComponent from "../../../components/ConditionalComponent";
import PageLoader from "../../../components/PageLoader";
import TopicCard from "./TopicCard";

export default function ByTopic() {
  const { topics } = useTopicsMap(true);

  return (
    <div
      id="topics-section"
      className="app-panel"
    >
      <Helmet>
        <title>Practice | JEE Portal</title>
        <meta
          name="description"
          content="Browse question from different topics."
        />
      </Helmet>

      <header className="panel-header">
        <h1>Topics</h1>
        <button className="select-button">
          <p>All</p>
          <ChevronsUpDownIcon />
        </button>
      </header>

      <ConditionalComponent
        show={Boolean(topics)}
        fallback={<PageLoader />}
      >
        {topics?.map((subject) => (
          <SubjectSection
            subject={subject}
            key={subject.name}
          />
        ))}
      </ConditionalComponent>
    </div>
  );
}

function SubjectSection({ subject }: { subject: TopicSubject }) {
  return (
    <section className="subject-section">
      <strong>{subject.name}</strong>
      <div>
        {subject.units.map((unit) => (
          <UnitSection
            unit={unit}
            key={unit.name}
          />
        ))}
      </div>
    </section>
  );
}

function UnitSection({ unit }: { unit: TopicUnit }) {
  return (
    <div className="unit-section">
      <strong>{unit.name}</strong>
      <ul>
        {unit.topics.map((topic) => (
          <TopicCard
            topic={topic}
            key={topic.id}
          />
        ))}
      </ul>
    </div>
  );
}

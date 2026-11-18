import "./style.css";

import { useState } from "react";
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
import SubjectPickerPopover from "./SubectPickerPopover";

export default function ByTopic() {
  const [filter, setFilter] = useState<
    "all" | "Physics" | "Chemistry" | "Mathematics"
  >("all");
  const { topics } = useTopicsMap(true);

  const filteredTopics = topics?.filter((subject) => {
    return filter === "all" || subject.name === filter;
  });

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
        <button
          className="select-button"
          popoverTarget="byTopic-subject-picker-popover"
          style={{ anchorName: "--byTopic-subject-picker-popover-anchor" }}
        >
          <p>{filter}</p>
          <ChevronsUpDownIcon />
        </button>

        <SubjectPickerPopover
          filter={filter}
          setFilter={setFilter}
        />
      </header>

      <ConditionalComponent
        show={Boolean(topics)}
        fallback={<PageLoader />}
      >
        {filteredTopics?.map((subject) => (
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
      <div className="scroll">
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

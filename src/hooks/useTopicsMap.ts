import { useEffect, useState } from "react";

export type Topic = {
  id: number;
  name?: string;
  subject?: "Physics" | "Chemistry" | "Mathematics";
  unit?: string;
  slug?: string;
};

export type TopicSubject = {
  name: string;
  units: TopicUnit[];
};

export type TopicUnit = {
  name: string;
  topics: Topic[];
};

export type Topics = Map<number, Topic>;

export function useTopicsMap(classified?: false): {
  topics: Topics | undefined;
  loading: boolean;
};
export function useTopicsMap(classified: true): {
  topics: TopicSubject[] | undefined;
  loading: boolean;
};
export function useTopicsMap(classified = false) {
  const [topics, setTopics] = useState<TopicSubject[] | Topics | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("/api/jee/topics");
        const data = (await response.json()) as unknown as {
          success: boolean;
          topics: Topic[];
        };

        if (!response.ok || !data.success) {
          throw new Error("Failed to load topics map");
        }

        if (classified) {
          const topicsObject = classify(data.topics);

          setTopics(topicsObject);
        } else {
          const map: Topics = new Map();

          data.topics.forEach((topic: Topic) => {
            map.set(topic.id, topic);
          });

          setTopics(map);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [classified]);

  return { topics: topics, loading };
}

function classify(topics: Topic[]): TopicSubject[] {
  const subjectMap = new Map<string, Map<string, Topic[]>>();

  for (const topic of topics) {
    const subName = topic.subject || "General";
    const unitName = topic.unit || "Miscellaneous";

    if (!subjectMap.has(subName)) {
      subjectMap.set(subName, new Map());
    }
    const unitMap = subjectMap.get(subName)!;

    if (!unitMap.has(unitName)) {
      unitMap.set(unitName, []);
    }
    unitMap.get(unitName)!.push(topic);
  }

  const subjects: TopicSubject[] = [];
  for (const [subName, unitMap] of subjectMap.entries()) {
    const units: TopicUnit[] = [];

    for (const [unitName, topicsList] of unitMap.entries()) {
      units.push({ name: unitName, topics: topicsList });
    }

    subjects.push({ name: subName, units });
  }

  return subjects;
}

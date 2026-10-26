import { useEffect, useState } from "react";

export type Topic = {
  id: number;
  name?: string;
  subject?: "Physics" | "Chemistry" | "Mathematics";
  unit?: string;
};

export type Topics = Map<number, Topic>;

export function useTopicsMap() {
  const [topicMap, setTopicMap] = useState<Topics | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("/api/jee/topics");
        const data = await res.json();

        if (data.success) {
          // Reduce rows into a lookup dictionary keyed by ID
          const map: Topics = new Map();
          data.topics.forEach((topic: Topic) => {
            map.set(topic.id, topic);
          });

          setTopicMap(map);
        }
      } catch (err) {
        console.error("Failed to load topics map:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  return { topicMap, loading };
}

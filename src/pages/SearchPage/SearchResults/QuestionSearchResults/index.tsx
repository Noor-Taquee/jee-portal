import PageLoader from "../../../../components/PageLoader";
import QuestionSearchCard from "./QuestionSearchCard";
import "./style.css";

import { useEffect, useState } from "react";

type SearchQuestion = {
  id: number;
  type: number;
  question_text: string;
  attempts_count: number;
  exams: {
    id: number;
    name: string;
    exam_type: string;
    date: string;
  }[];
};

interface Props {
  query: string;
}

export default function QuestionSearchResults({ query }: Props) {
  const [questions, setQuestions] = useState<SearchQuestion[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `/api/jee/searchQuestion/byText?search=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const data = (await response.json()) as {
          success: boolean;
          questions?: SearchQuestion[];
        };

        if (!response.ok || !data.success) {
          throw new Error("Unable to search questions");
        }

        setQuestions(data.questions ?? []);
        setStatus("success");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    };

    void fetchQuestions();
    return () => controller.abort();
  }, [query]);

  if (status === "loading") return <PageLoader />;
  if (status === "error") {
    return <p>Unable to search questions. Please try again.</p>;
  }

  if (questions.length === 0) {
    return <NoQuestion query={query} />;
  }

  return (
    <div id="question-search-results">
      {questions.map((question) => (
        <QuestionSearchCard
          searchQuestion={question}
          key={question.id}
        />
      ))}
    </div>
  );
}

function NoQuestion({ query }: { query: string }) {
  return (
    <div className="error-states">
      <p>
        {/* oxlint-disable-next-line react/no-unescaped-entities */}
        No questions found matching "<strong>{query}</strong>"
      </p>
    </div>
  );
}

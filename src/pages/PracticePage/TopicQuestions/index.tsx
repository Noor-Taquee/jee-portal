import "./style.css";

import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ConditionalComponent from "../../../components/ConditionalComponent";
import PageLoader from "../../../components/PageLoader";
import QuestionCard from "../../../components/QuestionCard";
import TopicHeader from "./TopicHeader";

type TopicSearchQuestion = {
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

type Result = {
  topic: {
    id: number;
    name: string;
    subject: string;
    unit: string;
  };
  questions: TopicSearchQuestion[];
};

export default function TopicQuestions() {
  const { topic } = useParams();

  const { loading, result, error, retry } = useFetch<Result>(
    `/api/jee/search/question/byTopic?topicId=${topic?.split("-")[0]}`
  );

  return (
    <div
      id="topic-questions-page"
      className="app-panel"
    >
      {loading || !result ? (
        <PageLoader />
      ) : (
        <ConditionalComponent
          show={!error}
          fallback={<ErrorPage retry={retry} />}
        >
          <TopicHeader topic={result.topic} />
          {result.questions.map((question) => (
            <QuestionCard
              question={question}
              key={question.id}
            />
          ))}
        </ConditionalComponent>
      )}
    </div>
  );
}

function ErrorPage({ retry }: { retry: () => any }) {
  return (
    <div>
      <p>{"Couldn't load"}</p>
      <button onClick={retry}></button>
    </div>
  );
}

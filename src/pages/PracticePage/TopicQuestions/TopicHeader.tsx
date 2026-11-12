import { Helmet } from "react-helmet-async";
import { TargetIcon } from "lucide-react";

interface Props {
  topic: {
    id: number;
    name: string;
    subject: string;
    unit: string;
  };
}

const TopicHeader = ({ topic }: Props) => {
  return (
    <>
      <Helmet>
        <title>{topic.name} | {topic.subject}</title>
        <link
          rel="canonical"
          href={`https://jee-portal.pages.dev/topic/${encodeURIComponent(topic.id)}`}
        />
      </Helmet>

      <header className="panel-header">
        <div className="topic-header">
          <TargetIcon />
          <div>
            <p>{topic.name}</p>
            <div>
              <small>{topic.unit}, {topic.subject}</small>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default TopicHeader;

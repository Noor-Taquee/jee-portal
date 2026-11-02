import "./style.css";

import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import PageLoader from "../../components/PageLoader";
import ErrorPage from "./ErrorPage";
import ConditionalComponent from "../../components/ConditionalComponent";

export default function ChangelogPage() {
  const [changelog, setChangelog] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/CHANGELOG.md", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load changelog");
        }

        return response.text();
      })
      .then(setChangelog)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === "AbortError") {
          return;
        }

        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="Loading changelog"
        id="changelog-page"
        className="app-panel"
      >
        <PageLoader />
      </div>
    );
  }

  return (
    <div
      id="changelog-page"
      className="app-panel"
    >
      <ConditionalComponent
        show={!error}
        fallback={<ErrorPage />}
      >
        <article
          aria-label="JEE Portal changelog"
          id="changelog-article"
        >
          <ReactMarkdown>{changelog}</ReactMarkdown>
        </article>
      </ConditionalComponent>
    </div>
  );
}

import "./style.css";

import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
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

  return (
    <div
      id="changelog-page"
      className="app-panel"
    >
      <Helmet>
        <link
          rel="canonical"
          href="https://jee-portal.pages.dev/changelog"
        />
        <title>Changelog</title>
        <meta
          name="description"
          content="See the latest JEE Portal updates, improvements, and fixes."
        />
        <meta
          property="og:title"
          content="Changelog | JEE Portal"
        />
        <meta
          property="og:description"
          content="See the latest JEE Portal updates, improvements, and fixes."
        />
        <meta
          property="og:url"
          content="https://jee-portal.pages.dev/changelog"
        />
        <meta
          name="twitter:title"
          content="Changelog | JEE Portal"
        />
        <meta
          name="twitter:description"
          content="See the latest JEE Portal updates, improvements, and fixes."
        />
      </Helmet>

      <ConditionalComponent
        show={!loading}
        fallback={<PageLoader />}
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
      </ConditionalComponent>
    </div>
  );
}

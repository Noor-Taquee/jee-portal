import { Link } from "react-router-dom";
import "./style.css";

import { useEffect, useState } from "react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

interface Props {
  headings?: TOCItem[];
}

export default function DocsSidebar({ headings: GivenHeadings }: Props) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (GivenHeadings) {
      // oxlint-disable-next-line react/set-state-in-effect
      setHeadings(GivenHeadings);
      return;
    }

    const articleElements = document.querySelectorAll("article h2, article h3");
    const items: TOCItem[] = Array.from(articleElements).map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    }));
    setHeadings(items);
  }, [setHeadings, GivenHeadings]);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0% -35% 0%",
      threshold: 1.0,
    });

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const scrollToHash = () => {
      const id =
        decodeURIComponent(window.location.hash.slice(1)) || headings[0]?.id;
      if (!id) return;

      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("popstate", scrollToHash);
    scrollToHash();

    return () => window.removeEventListener("popstate", scrollToHash);
  }, [headings]);

  // 3. Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <aside id="docs-sidebar">
      <h4>On this page</h4>
      <nav>
        {headings.map((heading) => (
          <Link
            key={heading.id}
            onClick={(e) => handleClick(e, heading.id)}
            className={`${activeId === heading.id ? "active" : ""} level-${heading.level}`}
            to={{ hash: heading.id }}
          >
            <p>{heading.text}</p>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

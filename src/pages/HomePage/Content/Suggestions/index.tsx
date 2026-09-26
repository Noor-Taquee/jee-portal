import { useExamSession } from "../../../../hooks/useExamSession";
import { changeHash } from "../../../../hooks/useHash";
import "./style.css";

import { useEffect, useState } from "react";

async function getSuggestions() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
  const data: { "2026": string[] } = await res.json();
  return data;
}

function format(raw: string) {
  let finalString = "";
  const parts = raw.split("_");
  finalString += parts[1];
  if (parts[0] === "jan") finalString += " January ";
  else if (parts[0] === "apr") finalString += " April ";
  finalString += `Shift-${parts[2] === "a" ? "I" : "II"}`;
  return finalString;
}

export default function Suggestions() {
  const examSession = useExamSession();

  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<{ "2026": string[] }>();

  useEffect(() => {
    getSuggestions().then((data) => {
      setSuggestions(data);
      setIsLoading(false);
    });
  });

  return (
    <div
      id="suggestion-container-wrapper"
      className={isLoading ? "animate-pulse" : ``}
    >
      <p className="header">Previous Year Questions</p>
      <div id="suggestion-container">
        <p className="header">JEE Mains 2026</p>
        {suggestions?.[2026].map((data) => (
          <button
            className="suggestion-button"
            key={data}
            onClick={() => {
              examSession.loadPaper(`2026/${data}`);
              changeHash("login");
            }}
          >
            <p>{format(data)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

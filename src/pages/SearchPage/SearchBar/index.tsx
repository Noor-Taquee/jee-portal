import "./style.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchIcon } from "lucide-react";
import InputBox from "../../../components/InputBox";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextParams = new URLSearchParams(searchParams);
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery);
    } else {
      nextParams.delete("q");
    }

    nextParams.set(
      "type",
      searchParams.get("type") === "users" ? "users" : "question"
    );

    setSearchParams(nextParams);
  }

  return (
    <form
      id="search-bar"
      onSubmit={handleSubmit}
    >
      <InputBox>
        <SearchIcon />
        <input
          name="search"
          className="text-search"
          type="search"
          autoCorrect="on"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </InputBox>
    </form>
  );
}

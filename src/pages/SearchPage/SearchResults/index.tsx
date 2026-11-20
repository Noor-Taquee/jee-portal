import "./style.css";

import { useSearchParams } from "react-router-dom";
import QuestionSearchResults from "./QuestionSearchResults";
import UserSearchResults from "./UserSearchResults";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const searchType =
    searchParams.get("type") === "users" ? "users" : "question";

  if (!query) return null;

  return searchType === "users" ? (
    <UserSearchResults
      key={query}
      query={query}
    />
  ) : (
    <QuestionSearchResults
      key={query}
      query={query}
    />
  );
}

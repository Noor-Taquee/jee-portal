import { BookSearchIcon, CheckIcon, UserSearchIcon } from "lucide-react";
import { useClosePopover } from "../../../hooks/useClosePopover";
import { useSearchParams } from "react-router-dom";

export default function SearchFilterPopover() {
  useClosePopover("search-filter-popover");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType =
    searchParams.get("type") === "users" ? "users" : "question";

  function selectType(type: "question" | "users") {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("type", type);
    setSearchParams(nextParams);
  }

  return (
    <div
      popover="auto"
      role="menu"
      id="search-filter-popover"
      className="popover-card down left-level"
      style={{ positionAnchor: "--search-filter-popover-anchor" }}
    >
      <button
        aria-label="Question"
        role="menuitemradio"
        aria-checked={selectedType === "question"}
        className="popover-entry"
        onClick={() => selectType("question")}
      >
        <BookSearchIcon />
        <p>Question</p>
        {selectedType === "question" && <CheckIcon className="check" />}
      </button>
      <button
        aria-label="Users"
        role="menuitemradio"
        aria-checked={selectedType === "users"}
        className="popover-entry"
        onClick={() => selectType("users")}
      >
        <UserSearchIcon />
        <p>Users</p>
        {selectedType === "users" && <CheckIcon className="check" />}
      </button>
    </div>
  );
}

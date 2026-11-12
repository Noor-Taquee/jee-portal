import { useSearchParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { ChevronsUpDownIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import SearchFilterPopover from "./SearchFilterPopover";
import SearchResult from "./SearchResults";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchType =
    searchParams.get("type") === "users" ? "users" : "questions";

  return (
    <div
      id="search-page"
      className="app-panel"
    >
      <Helmet>
        <title>Search | JEE Portal</title>
      </Helmet>

      <header className="panel-header">
        <h1>Search</h1>
        <button
          className="select-button"
          popoverTarget="search-filter-popover"
          style={{ anchorName: "--search-filter-popover-anchor" }}
        >
          <p>{searchType}</p>
          <ChevronsUpDownIcon />
        </button>
        <SearchFilterPopover />
      </header>

      <SearchBar />

      <SearchResult />
    </div>
  );
}

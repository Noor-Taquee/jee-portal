import "./style.css";

import { CalendarIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import InputBox from "../../../components/InputBox";

export default function Header() {
  return (
    <div id="table-header">
      <InputBox>
        <SearchIcon />
        <input
          type="search"
          name="test-search"
          placeholder="Search for tests"
        />
      </InputBox>

      <div id="date-period">
        <CalendarIcon />
        <p>
          <span>Jan 6 2026 - Jan 12 2026</span>
        </p>
      </div>

      <button id="filter-button">
        <ListFilterIcon />
        <span>Filter</span>
      </button>

      <button id="search-button">
        <span>Search</span>
      </button>
    </div>
  );
}

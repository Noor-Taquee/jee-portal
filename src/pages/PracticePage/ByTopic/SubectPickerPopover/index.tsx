import { CheckIcon } from "lucide-react";
import { useClosePopover } from "../../../../hooks/useClosePopover";

interface Props {
  filter: "all" | "Physics" | "Chemistry" | "Mathematics";
  setFilter: React.Dispatch<React.SetStateAction<Props["filter"]>>;
}

const SubjectPickerPopover = ({ filter, setFilter }: Props) => {
  useClosePopover("byTopic-subject-picker-popover");

  return (
    <div
      id="byTopic-subject-picker-popover"
      popover="auto"
      className="popover-card down left-level"
      style={{ positionAnchor: "--byTopic-subject-picker-popover-anchor" }}
    >
      <div className="vertical-container">
        <button
          name="all-subject-topics"
          aria-label="All"
          role="menuitemcheckbox"
          aria-checked={filter === "all" ? "true" : "false"}
          className="popover-entry"
          onClick={() => {
            setFilter("all");
          }}
        >
          <p>All</p>
          {filter === "all" && <CheckIcon className="check" />}
        </button>
        <hr className="divider" />
        <button
          name="physics-topics"
          aria-label="Physics"
          role="menuitemcheckbox"
          aria-checked={filter === "Physics" ? "true" : "false"}
          className="popover-entry"
          onClick={() => {
            setFilter("Physics");
          }}
        >
          <p>Physics</p>
          {filter === "Physics" && <CheckIcon className="check" />}
        </button>
        <button
          name="chemistry-topics"
          aria-label="Chemistry"
          role="menuitemcheckbox"
          aria-checked={filter === "Chemistry" ? "true" : "false"}
          className="popover-entry"
          onClick={() => {
            setFilter("Chemistry");
          }}
        >
          <p>Chemsitry</p>
          {filter === "Chemistry" && <CheckIcon className="check" />}
        </button>
        <button
          name="mathematics-topics"
          aria-label="Mathematics"
          role="menuitemcheckbox"
          aria-checked={filter === "Mathematics" ? "true" : "false"}
          className="popover-entry"
          onClick={() => {
            setFilter("Mathematics");
          }}
        >
          <p>Mathematics</p>
          {filter === "Mathematics" && <CheckIcon className="check" />}
        </button>
      </div>
    </div>
  );
};

export default SubjectPickerPopover;

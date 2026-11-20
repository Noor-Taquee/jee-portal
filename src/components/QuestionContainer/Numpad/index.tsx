import "./style.css";

import NumpadKey from "./NumpadKey";
import { DeleteIcon } from "lucide-react";

const struc = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

interface Props {
  selectedAnswer: string | null;
  setSelectedAnswer: React.Dispatch<
    React.SetStateAction<Props["selectedAnswer"]>
  >;
}

/** Numpad for Numerical type questions */
export default function Numpad({ selectedAnswer, setSelectedAnswer }: Props) {
  return (
    <div id="numpad-container">
      <input
        type="text"
        value={selectedAnswer || ""}
        id="numpad-input"
        readOnly={true}
        inert
      />
      <div id="numpad">
        {struc.map((row, rowNo) => {
          return row.map((key, columnNo) => (
            <button
              className="numpad-key"
              key={`numpad-${rowNo}-${columnNo}`}
              onClick={() => {
                setSelectedAnswer((p) => (p ? p + key : key));
              }}
            >
              <p>{key}</p>
            </button>
          ));
        })}
        <NumpadKey
          key={"numpad-3-0"}
          text={"."}
          onClick={() => {
            setSelectedAnswer((p) => (p ? p + "." : "."));
          }}
        />
        <NumpadKey
          key={"numpad-3-1"}
          text={"0"}
          onClick={() => {
            setSelectedAnswer((p) => (p ? p + "0" : "0"));
          }}
        />
        <button
          className="numpad-key"
          onClick={() => {
            setSelectedAnswer((p) => (p ? p.slice(0, p.length - 1) : ""));
          }}
          key={"numpad-3-2"}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

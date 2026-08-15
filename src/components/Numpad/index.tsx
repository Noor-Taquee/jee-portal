import NumpadKey from "./NumpadKey";
import "./style.css";

const struc = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

interface NumpadProps {
  answer: string | null;
  setAnswer: React.Dispatch<React.SetStateAction<string | string[] | null>>;
}

/** Numpad for Numerical type questions */
export default function Numpad({ answer, setAnswer }: NumpadProps) {
  return (
    <div id="numpad-container">
      <input
        type="text"
        value={answer || ""}
        id="numpad-input"
        readOnly={true}
        inert
      />
      <div id="numpad">
        {struc.map((row, rowNo) => {
          return row.map((key, columnNo) => {
            return (
              <NumpadKey
                text={key}
                key={`numpad-${rowNo}-${columnNo}`}
                onClick={() => {
                  setAnswer((p) => (p ? p + key : key));
                }}
              />
            );
          });
        })}
        <NumpadKey
          key={"numpad-3-0"}
          text={"."}
          onClick={() => {
            setAnswer((p) => (p ? p + "." : "."));
          }}
        />
        <NumpadKey
          key={"numpad-3-1"}
          text={"0"}
          onClick={() => {
            setAnswer((p) => (p ? p + "0" : "0"));
          }}
        />
        <NumpadKey
          key={"numpad-3-2"}
          text={"ph-fill ph-backspace"}
          icon={true}
          onClick={() => {
            setAnswer((p) => (p ? p.slice(0, p.length - 1) : ""));
          }}
        />
      </div>
    </div>
  );
}

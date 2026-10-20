import "./style.css";

import { useState } from "react";

import TextRenderer from "../TextRenderer";
import { PenLineIcon, SaveIcon } from "lucide-react";

interface Props {
  text: string;
  onSave: (newText: string) => void;
}

export default function EditableText({ text, onSave }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(text);

  return (
    <div className="editable-text-container">
      {editMode ? (
        <textarea
          id="question-editor"
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
        />
      ) : (
        <TextRenderer content={text} />
      )}
      <div className="button-container">
        <button
          className="cta-1"
          onClick={() => {
            if (editMode === true) {
              onSave(newText);
            }
            setEditMode((p) => !p);
          }}
        >
          {editMode ? <SaveIcon /> : <PenLineIcon />}
          {editMode ? <p>Save</p> : <p>Edit</p>}
        </button>
      </div>
    </div>
  );
}

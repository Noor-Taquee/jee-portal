import "./style.css";

import { useState } from "react";

import TextRenderer from "../../../../../components/TextRenderer";

interface Props {
  question: string;
}

export default function EditableText({ question }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newQuestion, setNewQuestion] = useState(question);

  return (
    <div className="editable-text-container">
      {editMode ? (
        <textarea
          id="question-editor"
          value={newQuestion}
          onChange={(e) => {
            setNewQuestion(e.target.value);
          }}
        />
      ) : (
        <TextRenderer content={question} />
      )}
      <div className="button-container">
        <button
          className="cta-btn"
          onClick={() => setEditMode((p) => !p)}
        >
          {editMode ? <p>Save</p> : <p>Edit</p>}
        </button>
      </div>
    </div>
  );
}

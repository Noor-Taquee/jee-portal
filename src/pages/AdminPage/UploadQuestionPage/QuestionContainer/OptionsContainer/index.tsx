import "./style.css";

import EditableText from "../../../../../components/EditableText";
import type { ReviewQuestion, SetQuestion } from "../../index";

interface Props {
  question: ReviewQuestion;
  setQuestion: SetQuestion;
}

export default function OptionsContainer({ question, setQuestion }: Props) {
  const questionOptions = question.options;

  if (!questionOptions) return <div></div>;

  return (
    <div id="review-option-container">
      {questionOptions.map((text, index) => (
        <div
          className="review-option-div"
          key={`${text}-${index}`}
        >
          <EditableText
            text={text}
            onSave={(newText: string) => {
              const options = [...questionOptions] as [
                string,
                string,
                string,
                string,
              ];
              options[index] = newText;
              setQuestion({ ...question, options });
            }}
          />
        </div>
      ))}
    </div>
  );
}

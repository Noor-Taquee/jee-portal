import "./style.css";

import type { SearchQuestion } from "..";

interface Props {
  question: SearchQuestion;
}

const Footer = ({ question }: Props) => {
  return (
    <footer>
      <div className="question-stats">
        <strong>{question.attempts_count}</strong>
        <span>attempts</span>
      </div>
    </footer>
  );
};

export default Footer;

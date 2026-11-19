import "./style.css";

import type { SearchQuestion } from "..";
import {
  ArrowRightIcon,
} from "lucide-react";

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

      <button
        className="cta-1"
      >
        <p>Solve</p>
        <ArrowRightIcon />
      </button>
    </footer>
  );
}

export default Footer;

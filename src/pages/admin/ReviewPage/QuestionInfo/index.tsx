// oxlint-disable max-lines-per-function

import "./style.css";

import type { Questions } from "..";

import TopicsSection from "./TopicsSection";
import QuestionTypeSection from "./QuestionTypeSection";
import MCQAnswerSection from "./MCQAnswerSection";
import NumericalAnswerSection from "./NumericalAnswerSection";

interface Props {
  question: Questions;
}

export default function QuestionInfo({ question }: Props) {
  return (
    <div id="review-question-info">
      <QuestionTypeSection question={question} />

      <TopicsSection question={question} />

      {question.type === 1 && <MCQAnswerSection question={question} />}

      {question.type === 6 && <NumericalAnswerSection question={question} />}
    </div>
  );
}

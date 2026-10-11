// oxlint-disable max-lines-per-function

import "./style.css";

import { useEffect, useState } from "react";

import Header from "./Header";
import QuestionContainer from "./QuestionContainer";
import QuestionInfo from "./QuestionInfo";
import ReviewProvider from "../../../context/ReviewContext/Provider";

export type Questions = {
  type: number;
  question_text: string;
  options: string[];
  correct_answer: "A" | "B" | "C" | "D" | number;
  numerical_tolerance: number;
  marking_scheme_id: number;
  topics: number[];
};

async function getData() {
  const res = await fetch("/data/review/questions.json");
  const data: Questions[] = await res.json();

  return data;
}

export default function ReviewPage() {
  const [data, setData] = useState<Questions[] | undefined>(undefined);
  const [questionNo, _setQuestionNo] = useState(0);

  useEffect(() => {
    getData().then((newData) => setData((p) => (p ? p : newData)));
  });

  const question = data?.[questionNo];

  if (!data || !question) {
    return (
      <div
        className="app-panel"
        id="review-page"
      >
        <div className="review-loading">Loading questions…</div>
      </div>
    );
  }

  return (
    <ReviewProvider>
      <div
        className="app-panel"
        id="review-page"
      >
        <Header />
        <div className="horizontal-container">
          <QuestionContainer question={question} />
          <QuestionInfo question={question} />
        </div>
      </div>
    </ReviewProvider>
  );
}

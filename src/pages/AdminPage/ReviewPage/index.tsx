// oxlint-disable max-lines-per-function

import "./style.css";

import { useEffect, useState } from "react";
import { useReview } from "../../../hooks/useReview";

import type { ReviewQuestion } from "../../../context/ReviewContext";

import Header from "./Header";
import QuestionContainer from "./QuestionContainer";
import QuestionInfo from "./QuestionInfo";

async function getData() {
  const res = await fetch("/data/review/questions.json");
  const data: ReviewQuestion[] = await res.json();

  return data;
}

export default function ReviewPage() {
  const { loadQuestions } = useReview();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then((newData) => {
      loadQuestions(newData);
      setLoading(false);
    });
  }, [loadQuestions]);

  if (loading) {
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
    <div
      className="app-panel"
      id="review-page"
    >
      <Header />
      <div className="horizontal-container">
        <QuestionContainer />
        <QuestionInfo />
      </div>
    </div>
  );
}

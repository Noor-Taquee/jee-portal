import { createContext } from "react";

export type ReviewQuestion = ReviewNumericalQuestion | ReviewMCQQuestion;

interface ReviewNumericalQuestion {
  type: 6;
  question_text: string;
  options: null;
  correct_answer: number;
  numerical_tolerance: number;
  marking_scheme_id: number;
  topics: number[];
}

interface ReviewMCQQuestion {
  type: 1;
  question_text: string;
  options: string[];
  correct_answer: "A" | "B" | "C" | "D";
  numerical_tolerance: 0;
  marking_scheme_id: number;
  topics: number[];
}

export type ReviewContextType = {
  questions: ReviewQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<ReviewQuestion[]>>;

  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;

  currentQuestion: ReviewQuestion | undefined;

  /** Replaces old questions with new questions and resets the `currentIndex` to `0` */
  loadQuestions: (questions: ReviewQuestion[]) => void;

  updateQuestion: (question: ReviewQuestion) => void;

  goTo: (question: number) => void;

  reset: () => void;
};

export const ReviewContext = createContext<ReviewContextType | null>(null);

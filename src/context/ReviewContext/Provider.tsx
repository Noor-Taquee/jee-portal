// oxlint-disable max-lines-per-function

import { useCallback, useMemo, useState } from "react";

import { ReviewContext, type ReviewContextType, type ReviewQuestion } from ".";

interface Props {
  children: React.ReactNode;
}

export default function ReviewProvider({ children }: Props) {
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  const loadQuestions = useCallback((nextQuestions: ReviewQuestion[]) => {
    setQuestions(nextQuestions);
    setCurrentIndex(0);
  }, []);

  const updateQuestion = useCallback(
    (updatedQuestion: ReviewQuestion) => {
      setQuestions((previousQuestions) =>
        previousQuestions.map((question, index) =>
          index === currentIndex ? updatedQuestion : question
        )
      );
    },
    [currentIndex]
  );

  const goTo = useCallback((question: number) => {
    setCurrentIndex((p) => {
      const newvalue = p + question;
      if (Math.max(0, newvalue) === Math.min(newvalue, 75)) return newvalue;
      return p;
    });
  }, []);

  const reset = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
  }, []);

  const value = useMemo<ReviewContextType>(
    () => ({
      questions,
      setQuestions,
      currentIndex,
      setCurrentIndex,
      currentQuestion,
      updateQuestion,
      goTo,
      reset,
      loadQuestions,
    }),
    [
      questions,
      currentIndex,
      currentQuestion,
      updateQuestion,
      goTo,
      reset,
      loadQuestions,
    ]
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

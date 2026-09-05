import { useEffect, useState } from "react";
import { getQuestions, type QuestionData } from "../core/data";
import type { AnswerResponse, ResponseData } from "../services";

export function useQuestionData(): [
  QuestionData[] | null,
  ResponseData,
  typeof setResponseData,
] {
  const [questionData, setQuestionData] = useState<QuestionData[] | null>(null);
  const [responseData, setResponseData] = useState<Map<number, AnswerResponse>>(
    new Map()
  );

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestionData(data.questions);
      setResponseData(
        new Map(
          data.questions.map((question) => {
            const res: [number, AnswerResponse] = [
              question.id,
              {
                type: question.type,
                visited: false,
                answer: null,
                review: false,
                submittedAnswer: null,
              },
            ];
            return res;
          })
        )
      );
    });
  }, []);

  return [questionData, responseData, setResponseData];
}

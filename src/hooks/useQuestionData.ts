import { useEffect, useState } from "react";
import { getQuestions, type ExamData } from "../core/data";
import type { AnswerResponse, ResponseData } from "../services";

export function useQuestionData(): [
  typeof questionData,
  typeof responseData,
  typeof setResponseData,
] {
  const [questionData, setQuestionData] = useState<ExamData | null>(null);
  const [responseData, setResponseData] = useState<ResponseData>(new Map());

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestionData(data);
      const initialResponseData = new Map(
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
      );

      setResponseData(initialResponseData);
    });
  }, []);

  return [questionData, responseData, setResponseData];
}

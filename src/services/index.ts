import type { OptionID, QuestionData } from "../core/data";

export type ResponseData = Map<number, AnswerResponse>;

export type AnswerResponse =
  SingleChoiceResponse | NumericalTypeResponse | MultipleChoiceResponse;

interface BaseResponse {
  type: "single-choice" | "multiple-choice" | "numerical";

  /** Flag for the question if it has been read or visited. */
  visited: boolean;

  /** If the question is marked for review. */
  review: boolean;

  /** Answer in cache (won't be evaluated) */
  answer: string | string[] | null;

  /** Answer Submitted (will be evaluated) */
  submittedAnswer: string | string[] | null;
}

interface NumericalTypeResponse extends BaseResponse {
  type: "numerical";
  answer: string | null;
  submittedAnswer: string | null;
}

interface SingleChoiceResponse extends BaseResponse {
  type: "single-choice";
  answer: OptionID | null;
  submittedAnswer: OptionID | null;
}

interface MultipleChoiceResponse extends BaseResponse {
  type: "multiple-choice";
  answer: OptionID[] | null;
  submittedAnswer: OptionID[] | null;
}

export function generateResponse(questionData: QuestionData[]) {
  return new Map(
    questionData.map((question) => {
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
}

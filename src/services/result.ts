import type { ResponseData } from ".";
import type { QuestionData } from "../core/data";

export type AnswerResult = {
  id: number;
  subject: "Chemistry" | "Physics" | "Mathematics";
  correctAnswer: string | string[];
  submittedAnswer: string | string[];
  status: "cor" | "inc" | "na";
  marks: number;
};

export type ResultData = AnswerResult[];

export function calculateResult(
  responseData: ResponseData,
  questionData: QuestionData[]
): ResultData {
  return questionData.map((question) => {
    const answerResult: AnswerResult = {
      id: question.id,
      subject: question.subject,
      correctAnswer: question.correctAnswer,
      submittedAnswer: "",
      status: "na",
      marks: 0,
    };

    const response = responseData.get(question.id);
    if (response) {
      answerResult.submittedAnswer = response.submittedAnswer || "";

      answerResult.status = response.submittedAnswer
        ? response.submittedAnswer === question.correctAnswer
          ? "cor"
          : "inc"
        : "na";

      answerResult.marks =
        answerResult.status === "na"
          ? 0
          : answerResult.status === "cor"
            ? 4
            : -1;
    }
    return answerResult;
  });
}

export type ResultMarks = [
  PhysicsMarks: number,
  ChemistryMarks: number,
  MathsMarks: number,
  TotalMarks: number,
];

export function calculateMarks(resultData: ResultData): ResultMarks {
  let [p, c, m] = [0, 0, 0];

  resultData.forEach((res) => {
    if (res.subject === "Physics") p += res.marks;
    else if (res.subject === "Chemistry") c += res.marks;
    else if (res.subject === "Mathematics") m += res.marks;
  });

  return [p, c, m, p + c + m];
}

// oxlint-disable max-lines-per-function
import type { ResponseData } from "./response";
import type { QuestionData } from "./question";

export type AnswerResult = {
  id: number;
  subject: "Chemistry" | "Physics" | "Mathematics";
  correctAnswer: string | string[];
  submittedAnswer: string | string[];
  status: "cor" | "inc" | "na";
  marks: number;
};

export type ResultData = AnswerResult[];

export interface TestResult {
  paperId: number;
  paperTitle: string;
  completedAt: number;
  totalMarks: number;
  maxMarks: number;
  timeTakenSeconds: number;
  subjectScores: {
    physics: number;
    chemistry: number;
    maths: number;
  };
  responses: AnswerResult[];
}

export function getResult(
  questionData: QuestionData[],
  responseData: ResponseData
) {
  const testResult: TestResult = {
    paperId: 0,
    paperTitle: "",
    completedAt: 0,
    timeTakenSeconds: 0,
    totalMarks: 0,
    maxMarks: 300,
    subjectScores: {
      physics: 0,
      chemistry: 0,
      maths: 0,
    },
    responses: [],
  };

  questionData.forEach((question) => {
    const answerResult: AnswerResult = {
      id: question.id,
      subject: question.subject,
      correctAnswer: question.answer,
      submittedAnswer: "",
      status: "na",
      marks: 0,
    };

    const response = responseData.get(question.id);
    if (response) {
      answerResult.submittedAnswer = response.submittedAnswer || "";

      answerResult.status = response.submittedAnswer
        ? response.submittedAnswer === question.answer
          ? "cor"
          : "inc"
        : "na";

      answerResult.marks =
        answerResult.status === "na"
          ? 0
          : answerResult.status === "cor"
            ? 4
            : question.type === "numerical"
              ? 0
              : -1;
    }

    testResult.totalMarks += answerResult.marks;
    if (answerResult.subject === "Physics") {
      testResult.subjectScores.physics += answerResult.marks;
    } else if (answerResult.subject === "Mathematics") {
      testResult.subjectScores.maths += answerResult.marks;
    } else if (answerResult.subject === "Chemistry") {
      testResult.subjectScores.chemistry += answerResult.marks;
    }

    testResult.responses.push(answerResult);
  });

  return testResult;
}

export type ResultMarks = [
  PhysicsMarks: number,
  ChemistryMarks: number,
  MathsMarks: number,
  TotalMarks: number,
];

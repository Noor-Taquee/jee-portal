// oxlint-disable max-lines-per-function
import type { ResponseData } from "./response";
import type { ExamSession } from "../context/ExamContext";

export type AnswerResult = {
  id: number;
  subject: "Chemistry" | "Physics" | "Mathematics";
  correctAnswer: string | string[];
  submittedAnswer: string | string[];
  timeTaken: number;
  status: "cor" | "inc" | "na";
  marks: number;
};

export type ResultData = AnswerResult[];

export interface TestResult {
  paperId: number;
  paperTitle: string;
  startedAt: Date;
  completedAt: Date;
  totalMarks: number;
  maxMarks: number;
  subjectScores: {
    physics: number;
    chemistry: number;
    maths: number;
  };
  responses: AnswerResult[];
}

export function getResult(
  examSession: ExamSession,
  responseData: ResponseData
) {
  if (!examSession.examData) {
    throw new Error();
  }

  const testResult: TestResult = {
    paperId: 0,
    paperTitle: "",
    startedAt: examSession.startedAt || new Date(),
    completedAt: examSession.completedAt || new Date(),
    totalMarks: 0,
    maxMarks: 300,
    subjectScores: {
      physics: 0,
      chemistry: 0,
      maths: 0,
    },
    responses: [],
  };

  examSession.examData.questions.forEach((question) => {
    const answerResult: AnswerResult = {
      id: question.id,
      subject: question.subject,
      correctAnswer: question.answer,
      submittedAnswer: "",
      timeTaken: 0,
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

      answerResult.timeTaken = response.timeTaken;
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

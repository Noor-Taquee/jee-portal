import { createContext } from "react";

import type { ExamData } from "../../core/question";
import type { ResponseData } from "../../core/response";

export type ExamSession = {
  /** Timestamp of the instance when exam started. */
  startedAt: Date | undefined;
  setStartedAt: React.Dispatch<React.SetStateAction<ExamSession["startedAt"]>>;

  /** Timestamp of the instance when exam completed. */
  completedAt: Date | undefined;
  setCompletedAt: React.Dispatch<
    React.SetStateAction<ExamSession["completedAt"]>
  >;

  /** Question data and metadata for the current exam. */
  examData: ExamData | undefined;
  setExamData: React.Dispatch<React.SetStateAction<ExamSession["examData"]>>;

  /** Response of the candidate. */
  candidateResponse: ResponseData | undefined;
  setCandidateResponse: React.Dispatch<
    React.SetStateAction<ExamSession["candidateResponse"]>
  >;
};

export const defaultTestData: ExamSession = {
  startedAt: undefined,
  setStartedAt: () => {},
  completedAt: undefined,
  setCompletedAt: () => {},
  examData: undefined,
  setExamData: () => {},
  candidateResponse: undefined,
  setCandidateResponse: () => {},
};

export const ExamContext = createContext<ExamSession>(defaultTestData);

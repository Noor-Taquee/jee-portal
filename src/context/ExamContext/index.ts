import { createContext } from "react";

import type { ExamData } from "../../core/data";
import type { ResponseData } from "../../services";

export type ExamSession = {
  /** Timestamp of the instance when exam started. */
  startedAt: Date | undefined;
  setStartedAt: React.Dispatch<React.SetStateAction<ExamSession["startedAt"]>>;

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
  examData: undefined,
  setExamData: () => {},
  candidateResponse: undefined,
  setCandidateResponse: () => {},
};

export const ExamContext = createContext<ExamSession>(defaultTestData);

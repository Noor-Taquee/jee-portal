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

  /** Loads a paper from a given path.
   * @example
   * ```ts
   * loadPaper("2026/jan_21_a");
   * ```
   */
  loadPaper: (path: string) => void;
};

export const ExamContext = createContext<ExamSession | null>(null);

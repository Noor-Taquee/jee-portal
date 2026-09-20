import { useState } from "react";

import { ExamContext, type ExamSession } from ".";

import type { ResponseData } from "../../core/response";
import type { ExamData } from "../../core/data";

interface ExamProviderProps {
  children: React.ReactNode;
}

export default function ExamProvider({ children }: ExamProviderProps) {
  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);

  const [examData, setExamData] = useState<ExamData | undefined>(undefined);

  const [responseData, setResponseData] = useState<ResponseData | undefined>(
    undefined
  );

  const value: ExamSession = {
    startedAt: startedAt,
    setStartedAt: setStartedAt,
    examData: examData,
    setExamData: setExamData,
    candidateResponse: responseData,
    setCandidateResponse: setResponseData,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

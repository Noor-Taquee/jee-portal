import { useState } from "react";

import { ExamContext, type ExamSession } from ".";

import { generateResponse, type ResponseData } from "../../core/response";
import { getQuestions, type ExamData } from "../../core/question";

interface ExamProviderProps {
  children: React.ReactNode;
}

export default function ExamProvider({ children }: ExamProviderProps) {
  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);

  const [completedAt, setCompletedAt] = useState<Date | undefined>(undefined);

  const [examData, setExamData] = useState<ExamData | undefined>(undefined);

  const [candidateResponse, setCandidateResponse] = useState<
    ResponseData | undefined
  >(undefined);

  function loadPaper(path: string) {
    getQuestions(path).then((data) => {
      setStartedAt(undefined);
      setCompletedAt(undefined);
      setExamData(data);
      setCandidateResponse(generateResponse(data.questions));
    });
  }

  const value: ExamSession = {
    startedAt: startedAt,
    setStartedAt: setStartedAt,
    completedAt: completedAt,
    setCompletedAt: setCompletedAt,
    examData: examData,
    setExamData: setExamData,
    candidateResponse: candidateResponse,
    setCandidateResponse: setCandidateResponse,
    loadPaper: loadPaper,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

import { useContext } from "react";
import { ExamContext } from "../context/ExamContext";

/**
 * Hook to access/modify test data using the `ExamContext`.
 */
export function useExamSession() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExamSession must be used within a ExamProvider");
  }
  return context;
}

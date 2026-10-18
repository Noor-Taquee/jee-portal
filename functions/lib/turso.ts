import { createClient } from "@libsql/client/web";

export interface TursoEnv {
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
}

export function getTursoClient(env: TursoEnv) {
  if (!env.TURSO_DATABASE_URL || !env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing Turso environment variables in context.env");
  }

  return createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
}

export type TopicsTableRow = {
  id: number;

  /** Unique slug for the topic */
  slug: string;

  /** Display name for the topic */
  name: string;

  /** Unit to which the topic belongs */
  unit: string;

  /** Subject to which the topic belongs */
  subject: "Physics" | "Chemistry" | "Mathematics";
};

export type ExamsTableRow = {
  /** PRIMARY KEY */
  id: number;

  /**
   * Full name of the exam
   * @example "JEE Main 2026 (Online) 8th April Evening Shift"
   */
  name: string;

  /** @example "JEE Main" | "JEE Advanced" | "IIT-JEE" */
  exam_type: string;

  /** ISO 8601 formatted timestamp `YYYY-MM-DD HH:MM:SS.SSS` */
  date: string;
};

export type QuestionsTableRow = {
  /** PRIMARY KEY */
  id: number;

  /** Question type and marking scheme */
  type: number;

  /** Question content in Markdown */
  question_text: string;

  /** null for Numerical Questions */
  options: null | [string, string, string, string];

  correct_answer: number | "A" | "B" | "C" | "D";

  /** For Numerical Questions */
  numerical_tolerance: number;

  explanation: string | null;

  attempts_count: number;

  correct_attempts_count: number;

  rate_sum: number;

  rate_count: number;

  created_at: string;
};

export type QuestionType = {
  name: string;
  slug: "mcq" | "numerical";
  correct: number;
  incorrect: number;
  unattempted: number;
};

export function parseType(typeId: number) {
  const typeMap: Map<number, QuestionType> = new Map([
    [
      1,
      {
        name: "MCQ (Single Correct Answer)",
        slug: "mcq",
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      },
    ],
    [
      2,
      {
        name: "MCQ (Single Correct Answer)",
        slug: "mcq",
        correct: 3,
        incorrect: -1,
        unattempted: 0,
      },
    ],
    [
      6,
      {
        name: "Numerical Answer",
        slug: "numerical",
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      },
    ],
  ]);

  return typeMap.get(typeId);
}

export type OptionId = "A" | "B" | "C" | "D";

export type QuestionOption = {
  id: OptionId;
  content: string;
};
export type QuestionOptions = QuestionOption[];

export const optionIdRecord = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
} as const;

export const optionIdArray = ["A", "B", "C", "D"] as const;

export function parseOptions(rawOptions: unknown): QuestionOptions {
  let options = rawOptions;

  // 1. If the database returned options as a JSON string, parse it first
  if (typeof rawOptions === "string") {
    try {
      options = JSON.parse(rawOptions);
    } catch {
      throw new Error(`Failed to parse options JSON string: ${rawOptions}`);
    }
  }

  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(
      `Invalid options format: expected an array of 4 strings, rawOptions: ${rawOptions}`
    );
  }

  const compatibleOptions: QuestionOptions = [];

  options.forEach((option, i) => {
    if (typeof option !== "string") {
      throw new Error(`Option content must be a string but got: ${option}`);
    }
    compatibleOptions.push({
      id: optionIdArray[i] as OptionId,
      content: option,
    });
  });

  return compatibleOptions;
}

export type AppCompatibleQuestion = MultipleChoiceQuestion | NumericalQuestion;

type NumericalQuestion = {
  id: number;
  type: QuestionType;
  question_text: string;
  options: null;
  correct_answer: string;
  numerical_tolerance: number;
  explanation: string;
  attempts_count: number;
  correct_attempts_count: number;
  rate_sum: number;
  rate_count: number;
  created_at: string;
};

type MultipleChoiceQuestion = {
  id: number;
  type: QuestionType;
  question_text: string;
  options: QuestionOptions;
  correct_answer: OptionId;
  numerical_tolerance: number;
  explanation: string;
  attempts_count: number;
  correct_attempts_count: number;
  rate_sum: number;
  rate_count: number;
  created_at: string;
};

export function parseQuestion(rawQuestion: any): AppCompatibleQuestion | null {
  try {
    const questionType = parseType(rawQuestion.type);
    if (!questionType) {
      throw new Error(`Unknown question type ID: ${rawQuestion.type}`);
    }

    // Common fields shared by both question types
    const baseQuestion = {
      id: rawQuestion.id,
      type: questionType,
      question_text: rawQuestion.question_text,
      numerical_tolerance: rawQuestion.numerical_tolerance,
      explanation: rawQuestion.explanation,
      attempts_count: rawQuestion.attempts_count,
      correct_attempts_count: rawQuestion.correct_attempts_count,
      rate_sum: rawQuestion.rate_sum,
      rate_count: rawQuestion.rate_count,
      created_at: rawQuestion.created_at,
    };

    if (rawQuestion.options === null) {
      return {
        ...baseQuestion,
        options: null,
        correct_answer: String(rawQuestion.correct_answer),
      } as NumericalQuestion;
    }

    return {
      ...baseQuestion,
      options: parseOptions(rawQuestion.options),
      correct_answer: String(rawQuestion.correct_answer) as OptionId,
    } as MultipleChoiceQuestion;
  } catch {
    return null;
  }
}

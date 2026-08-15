export type OptionID = "A" | "B" | "C" | "D";

export type OptionData = {
  id: OptionID;
  content: string;
};

export interface BaseQuestion {
  id: number;
  subject: "Chemistry" | "Physics" | "Mathematics";
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: OptionData[];
  correctOption: OptionID[];
}

export interface SingleChoiceQuestions extends BaseQuestion {
  type: "single-choice";
  options: OptionData[];
  correctOption: OptionID;
}

interface NumericalTypeQuestion extends BaseQuestion {
  type: "numerical";
  correctAnswer: string;
}

export type QuestionData =
  SingleChoiceQuestions | MultipleChoiceQuestion | NumericalTypeQuestion;

export async function getQuestions() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
  const data: QuestionData[] = await res.json();
  return data;
}

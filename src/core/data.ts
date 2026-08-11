export type TextPart = {
  type: "text" | "image" | "equation";
  place?: "inline" | "standalone";
  content: string;
};

export type TextFormat = TextPart[];

export type OptionData = {
  index: number;
  value: TextFormat;
};

export type QuestionData = {
  index: number;
  question: TextFormat;
  options: OptionData[];
};

export async function getQuestions() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/example.json`);
  const data: { questions: QuestionData[] } = await res.json();
  return data.questions;
}

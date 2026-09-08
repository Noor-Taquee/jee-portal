import { z } from "zod";

export const OptionIDSchema = z.enum(["A", "B", "C", "D"]);
export type OptionID = z.infer<typeof OptionIDSchema>;

export const OptionDataSchema = z.object({
  id: OptionIDSchema,
  content: z.string(),
});
export type OptionData = z.infer<typeof OptionDataSchema>;

export const BaseQuestionSchema = z.object({
  id: z.number(),
  subject: z.enum(["Chemistry", "Physics", "Mathematics"]),
  question: z.string(),
});

export const MultipleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("multiple-choice"),
  options: z.array(OptionDataSchema),
  correctAnswer: z.array(OptionIDSchema),
});
export type MultipleChoiceQuestion = z.infer<
  typeof MultipleChoiceQuestionSchema
>;

export const SingleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("single-choice"),
  options: z.array(OptionDataSchema),
  correctAnswer: OptionIDSchema,
});
export type SingleChoiceQuestions = z.infer<typeof SingleChoiceQuestionSchema>;

export const NumericalTypeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("numerical"),
  correctAnswer: z.string(),
});
export type NumericalTypeQuestion = z.infer<typeof NumericalTypeQuestionSchema>;

export const QuestionDataSchema = z.discriminatedUnion("type", [
  SingleChoiceQuestionSchema,
  MultipleChoiceQuestionSchema,
  NumericalTypeQuestionSchema,
]);

export type QuestionData = z.infer<typeof QuestionDataSchema>;

export const MetadataSchema = z.object({
  year: z.number(),
  month: z.string(),
  date: z.number(),
  shift: z.number(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

export const ExamDataSchema = z.object({
  metadata: MetadataSchema,
  questions: z.array(QuestionDataSchema),
});

export type ExamData = z.infer<typeof ExamDataSchema>;

export async function getQuestions() {
  const res = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
  const data: ExamData = await res.json();
  return data;
}

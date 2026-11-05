import { getTursoClient, TursoEnv } from "../../../lib/turso";

const MAX_RESULTS = 15;

type QuestionSearchRow = {
  id: number;
  type: number;
  question_text: string;
  attempts_count: number;
  search_rank: number;
  exam_id: number | null;
  exam_name: string | null;
  exam_type: string | null;
  exam_date: string | null;
};

type QuestionSearchResult = Omit<
  QuestionSearchRow,
  "search_rank" | "exam_id" | "exam_name" | "exam_type" | "exam_date"
> & {
  exams: {
    id: number;
    name: string;
    exam_type: string;
    date: string;
  }[];
};

export const onRequestGet: PagesFunction<TursoEnv> = async (context) => {
  const search = new URL(context.request.url).searchParams
    .get("search")
    ?.trim();

  if (!search) {
    return Response.json({ success: true, questions: [] });
  }

  try {
    const turso = getTursoClient(context.env);

    const pattern = `%${search}%`;

    const result = await turso.execute({
      sql: `
        WITH matched_questions AS (
          SELECT
            id,
            type,
            question_text,
            attempts_count,
            CASE
              WHEN question_text = ? THEN 0
              WHEN question_text LIKE ? THEN 1
              ELSE 2
            END AS search_rank
          FROM questions
          WHERE question_text LIKE ?
          ORDER BY search_rank, id DESC
          LIMIT ?
        )
        SELECT
          matched_questions.id,
          matched_questions.type,
          matched_questions.question_text,
          matched_questions.attempts_count,
          matched_questions.search_rank,
          exams.id AS exam_id,
          exams.name AS exam_name,
          exams.exam_type AS exam_type,
          exams.date AS exam_date
        FROM matched_questions
        LEFT JOIN question_r_exams
          ON question_r_exams.question_id = matched_questions.id
        LEFT JOIN exams
          ON exams.id = question_r_exams.exam_id
        ORDER BY matched_questions.search_rank, matched_questions.id DESC, exams.date DESC
      `,
      args: [search, `${search}%`, pattern, MAX_RESULTS],
    });

    const questions = new Map<number, QuestionSearchResult>();

    for (const row of result.rows as unknown as QuestionSearchRow[]) {
      let question = questions.get(row.id);

      if (!question) {
        question = {
          id: row.id,
          type: row.type,
          question_text: row.question_text,
          attempts_count: row.attempts_count,
          exams: [],
        };
        questions.set(row.id, question);
      }

      if (row.exam_id !== null) {
        question.exams.push({
          id: row.exam_id,
          name: row.exam_name ?? "",
          exam_type: row.exam_type ?? "",
          date: row.exam_date ?? "",
        });
      }
    }

    return Response.json({ success: true, questions: [...questions.values()] });
  } catch {
    return Response.json(
      { success: false, questions: [], error: "Unable to search questions" },
      { status: 500 }
    );
  }
};

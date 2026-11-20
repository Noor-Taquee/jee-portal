import { getTursoClient, TursoEnv } from "../../../../lib/turso";

const MAX_RESULTS = 15;

type TopicSearchRow = {
  topic_id: number;
  topic_name: string;
  topic_subject: string;
  topic_unit: string;

  question_id: number | null;
  question_type: number | null;
  question_text: string | null;
  attempts_count: number | null;

  exam_id: number | null;
  exam_name: string | null;
  exam_type: string | null;
  exam_date: string | null;
};

type TopicSearchQuestion = {
  id: number;
  type: number;
  question_text: string;
  attempts_count: number;

  exams: {
    id: number;
    name: string;
    exam_type: string;
    date: string;
  }[];
};

export const onRequestGet: PagesFunction<TursoEnv> = async (context) => {
  const searchParams = new URL(context.request.url).searchParams;
  const topicIdValue =
    searchParams.get("topicId") ?? searchParams.get("topic_id");
  const topicId = Number(topicIdValue);

  if (!topicIdValue || !Number.isSafeInteger(topicId) || topicId <= 0) {
    return Response.json(
      {
        success: false,
        result: {
          topic: null,
          questions: [],
        },
        error: "Invalid topic ID",
      },
      { status: 400 }
    );
  }

  try {
    const turso = getTursoClient(context.env);
    const result = await turso.execute({
      sql: `
				WITH requested_topic AS (
					SELECT id, name, subject, unit
					FROM topics
					WHERE id = ?
				), matched_questions AS (
					SELECT
						questions.id,
						questions.type,
						questions.question_text,
						questions.attempts_count,
						question_r_topics.topic_id
					FROM questions
					INNER JOIN question_r_topics
						ON question_r_topics.question_id = questions.id
					INNER JOIN requested_topic
						ON requested_topic.id = question_r_topics.topic_id
					ORDER BY questions.id DESC
					LIMIT ?
				)
				SELECT
					requested_topic.id AS topic_id,
					requested_topic.name AS topic_name,
					requested_topic.subject AS topic_subject,
					requested_topic.unit AS topic_unit,
					matched_questions.id AS question_id,
					matched_questions.type AS question_type,
					matched_questions.question_text AS question_text,
					matched_questions.attempts_count AS attempts_count,
					exams.id AS exam_id,
					exams.name AS exam_name,
					exams.exam_type AS exam_type,
					exams.date AS exam_date
				FROM requested_topic
				LEFT JOIN matched_questions
					ON matched_questions.topic_id = requested_topic.id
				LEFT JOIN question_r_exams
					ON question_r_exams.question_id = matched_questions.id
				LEFT JOIN exams
					ON exams.id = question_r_exams.exam_id
				ORDER BY matched_questions.id DESC, exams.date DESC
			`,
      args: [topicId, MAX_RESULTS],
    });

    let topic: {
      id: number;
      name: string;
      subject: string;
      unit: string;
    } | null = null;
    const questions = new Map<number, TopicSearchQuestion>();

    for (const row of result.rows as unknown as TopicSearchRow[]) {
      topic ??= {
        id: row.topic_id,
        name: row.topic_name,
        subject: row.topic_subject,
        unit: row.topic_unit,
      };

      if (row.question_id === null) continue;

      let question = questions.get(row.question_id);
      if (!question) {
        question = {
          id: row.question_id,
          type: row.question_type!,
          question_text: row.question_text!,
          attempts_count: row.attempts_count!,
          exams: [],
        };
        questions.set(row.question_id, question);
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

    return Response.json({
      success: true,
      result: {
        topic: topic,
        questions: [...questions.values()],
      },
    });
  } catch (error: unknown) {
    console.error(error);

    let message = "Unable to search questions by topic";
    let status = 500;

    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json(
      {
        success: false,
        result: {
          topic: null,
          questions: [],
        },
        error: message,
      },
      { status: status }
    );
  }
};

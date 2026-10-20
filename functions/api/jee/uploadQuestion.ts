// oxlint-disable max-lines-per-function

import { verifyRequest } from "../../lib/auth";
import { D1Env } from "../../lib/d1";
import { getTursoClient, TursoEnv } from "../../lib/turso";

interface Env extends TursoEnv, D1Env {}

type ReviewQuestion = {
  /** 1 = Multiple Choice 6 = Numerical */
  type: 1 | 6;

  question_text: string;

  options: null | [string, string, string, string];

  correct_answer: number | "A" | "B" | "C" | "D";

  numerical_tolerance: number;

  topics: number[];

  exam_id: number | null;
};

function isValidQuestion(question: ReviewQuestion) {
  // check options for MCQ question
  if (question.type === 1) {
    if (!Array.isArray(question.options)) {
      return "Options array is not provided";
    }

    if (question.options.length !== 4) {
      return "There must be 4 options";
    }

    if (
      question.options.every(
        (option) => typeof option === "string" && option.trim() !== ""
      )
    ) {
      return "Options cannot be empty";
    }

    if (typeof question.correct_answer !== "string") {
      return " Correct answre must be a string";
    }

    if (["A", "B", "C", "D"].includes(question.correct_answer)) {
      return "Correct answer must be one of A, B, C or D.";
    }

    if (question.numerical_tolerance !== 0) {
      return "Numerical tolerance for MCQ questions must be 0";
    }
  }

  // check answer for numerical question
  else if (question.type === 6) {
    if (question.options !== null) {
      return "Numerical type questions must not have options.";
    }
    if (
      typeof question.correct_answer !== "number" ||
      !Number.isFinite(question.correct_answer)
    ) {
      return "The answer must be a finite number";
    }
  } else {
    return "Invalid question type";
  }

  // check if question_text is present
  if (
    typeof question.question_text !== "string" ||
    !question.question_text.trim()
  )
    return "Question text is required";

  // Check if topics array is valid
  if (
    !Array.isArray(question.topics) ||
    question.topics.length === 0 ||
    !question.topics.every((topic) => Number.isSafeInteger(topic) && topic > 0)
  )
    return "At least one valid topic is required";

  // check numerical_tolerance
  if (
    typeof question.numerical_tolerance !== "number" ||
    !Number.isFinite(question.numerical_tolerance) ||
    question.numerical_tolerance < 0
  )
    return "Numerical tolerance must be a non-negative number";

  // check exam_id
  if (
    typeof question.exam_id !== "number" ||
    !Number.isSafeInteger(question.exam_id) ||
    question.exam_id <= 0
  )
    return "Invalid exam ID";

  return true;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const res = await verifyRequest(context.request, context.env.DB);

  if (
    !res ||
    !res.user ||
    (res.user.role !== "admin" && res.user.role !== "maintainer")
  ) {
    return Response.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  let body: { question?: ReviewQuestion };
  try {
    body = await context.request.json<{ question?: ReviewQuestion }>();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!body.question) {
    return Response.json(
      {
        success: false,
        error: "question is required",
      },
      { status: 400 }
    );
  }

  // Check validity of question
  const question_report = isValidQuestion(body.question);
  if (question_report !== true) {
    return Response.json(
      {
        success: false,
        error: "Invalid Question data",
        cause: question_report,
      },
      { status: 400 }
    );
  }

  try {
    const turso = getTursoClient(context.env);

    // Check if question already exists
    const matchedQuestion = await turso.execute({
      sql: `
        JOIN question_r_exams ON questions.id = question_r_exams.question_id
        WHERE question_r_exams.exam_id = ? AND questions.question_text = ? AND questions.type = ?
      `,
      args: [
        body.question.exam_id,
        body.question.question_text,
        body.question.type,
      ],
    });

    if (matchedQuestion.rows.length > 0) {
      return Response.json(
        {
          success: false,
          error: "Question already exists in the selected exam",
        },
        { status: 409 }
      );
    }

    const transaction = await turso.transaction("write");

    try {
      const result = await transaction.execute({
        sql: `
          INSERT INTO questions (
            type, question_text, options, correct_answer, numerical_tolerance
          )
          VALUES (?, ?, ?, ?, ?)
        `,
        args: [
          body.question.type,
          body.question.question_text,
          body.question.options === null
            ? null
            : JSON.stringify(body.question.options),
          JSON.stringify(body.question.correct_answer),
          body.question.numerical_tolerance,
        ],
      });

      if (typeof result.lastInsertRowid !== "number") throw new Error();

      for (const topicId of body.question.topics) {
        await transaction.execute({
          sql: "INSERT INTO question_r_topics (question_id, topic_id) VALUES (?, ?)",
          args: [result.lastInsertRowid, topicId],
        });
      }

      await transaction.execute({
        sql: "INSERT INTO question_r_exams (question_id, exam_id) VALUES (?, ?)",
        args: [result.lastInsertRowid, body.question.exam_id],
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    return Response.json({
      success: true,
      relations: {
        topics: true,
        exam: true,
      },
    });
  } catch {
    return Response.json(
      {
        success: false,
        error: "Failed to upload question",
      },
      { status: 500 }
    );
  }
};

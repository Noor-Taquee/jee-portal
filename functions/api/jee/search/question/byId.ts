import { getTursoClient, TursoEnv } from "../../../../lib/turso";

export const onRequestGet: PagesFunction<TursoEnv> = async (context) => {
  const searchParams = new URL(context.request.url).searchParams;
  const questionIdValue =
    searchParams.get("questionId") ?? searchParams.get("question_id");

  try {
    const questionId = Number(questionIdValue);

    if (!Number.isFinite(questionId) || !Number.isSafeInteger(questionId)) {
      return Response.json({
        success: false,
        result: {
          question: null,
        },
        error: "Invalid question id",
      });
    }

    const turso = getTursoClient(context.env);
    const result = await turso.execute({
      sql: `SELECT * FROM questions where id = ?`,
      args: [questionId],
    });

    return Response.json({
      success: true,
      result: {
        question: result.rows[0],
      },
    });
  } catch (error: unknown) {
    let message = "An unexpected error occurred";
    let status = 500;

    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json(
      {
        success: false,
        result: null,
        error: message,
      },
      { status: status }
    );
  }
};

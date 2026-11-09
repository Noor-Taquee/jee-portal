import { getTursoClient, TursoEnv } from "../../lib/turso";

export const onRequestGet: PagesFunction<TursoEnv> = async (context) => {
  try {
    const turso = getTursoClient(context.env);
    const result = await turso.execute(
      "SELECT id, name, subject, unit, slug FROM topics"
    );

    return Response.json({
      success: true,
      result: {
        topics: result.rows,
      },
      topics: result.rows,
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
        error: message,
        result: null,
      },
      { status: status }
    );
  }
};

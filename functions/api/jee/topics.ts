import { getTursoClient, TursoEnv } from "../../lib/turso";

export const onRequestGet: PagesFunction<TursoEnv> = async (context) => {
  try {
    const turso = getTursoClient(context.env);
    const result = await turso.execute(
      "SELECT id, name, subject, unit FROM topics"
    );

    return Response.json({
      success: true,
      topics: result.rows,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
};

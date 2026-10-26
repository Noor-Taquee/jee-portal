import { verifyRequest } from "../../lib/auth";
import { D1Env } from "../../lib/d1";
import { getTursoClient, TursoEnv } from "../../lib/turso";

interface Env extends TursoEnv, D1Env {}

const MAX_RESULTS = 15;

export const onRequestGet: PagesFunction<Env> = async (context) => {
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

  const search = new URL(context.request.url).searchParams
    .get("search")
    ?.trim();

  if (!search) {
    return Response.json({ success: true, exams: [] });
  }

  try {
    const turso = getTursoClient(context.env);
    const pattern = `%${search}%`;
    const result = await turso.execute({
      sql: `
        SELECT id, name, exam_type, date
        FROM exams
        WHERE name LIKE ? OR exam_type LIKE ? OR date LIKE ?
        ORDER BY
          CASE
            WHEN name = ? THEN 0
            WHEN name LIKE ? THEN 1
            WHEN name LIKE ? THEN 2
            ELSE 3
          END,
          date DESC,
          name ASC
        LIMIT ?
      `,
      args: [
        pattern,
        pattern,
        pattern,
        search,
        `${search}%`,
        pattern,
        MAX_RESULTS,
      ],
    });

    return Response.json({
      success: true,
      exams: result.rows,
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

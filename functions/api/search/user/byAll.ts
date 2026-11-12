import { D1Env } from "../../../lib/d1";
import { UsersTableRow } from "../../../lib/d1";

export const onRequestGet: PagesFunction<D1Env> = async (context) => {
  const search = new URL(context.request.url).searchParams
    .get("search")
    ?.trim();

  if (!search) {
    return Response.json({
      success: true,
      result: []
    });
  }

  try {
    const pattern = `%${search}%`;
    const result = await context.env.DB.prepare(
      `SELECT username, name, role, visibility
       FROM users
       WHERE username LIKE ? OR name LIKE ?
       ORDER BY
         CASE
           WHEN username = ? THEN 0
           WHEN username LIKE ? THEN 1
           WHEN name LIKE ? THEN 2
           ELSE 3
         END,
         username COLLATE NOCASE ASC`
    )
      .bind(pattern, pattern, search, `${search}%`, `${search}%`)
      .all<Pick<UsersTableRow, "username" | "name" | "role" | "visibility">>();

    return Response.json({
      success: true,
      result: result.results,
    });
  } catch {
    return Response.json(
      {
        success: false,
        result: [],
        error: "Unable to search users"
      },
      { status: 500 }
    );
  }
};

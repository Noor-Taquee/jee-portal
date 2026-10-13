export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (
  context
) => {
  const sessionToken = context.request.headers
    .get("Authorization")
    ?.match(/^Bearer\s+(.+)$/iu)?.[1];

  if (!sessionToken) {
    return Response.json(
      { success: false, error: "Invalid session" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const user = await context.env.DB.prepare(
      "SELECT name, username, role FROM users WHERE session_token = ?"
    )
      .bind(sessionToken)
      .first<{
        name: string;
        username: string;
        role: "student" | "maintainer" | "admin";
      }>();

    if (!user) {
      return Response.json(
        { success: false, error: "Invalid session" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    return Response.json(
      { success: true, user },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json(
      { success: false, error: "Unable to restore session" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
};
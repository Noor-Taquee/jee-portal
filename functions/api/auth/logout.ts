import { D1Env } from "../../lib/d1";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
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
    await context.env.DB.prepare(
      "UPDATE users SET session_token = NULL, session_created_at = NULL, session_expires_at = NULL WHERE session_token = ?"
    )
      .bind(sessionToken)
      .run();

    return Response.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json(
      { success: false, error: "Unable to log out" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
};

import { D1Env } from "../../lib/d1";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  // Extract session token
  const sessionToken = context.request.headers
    .get("Authorization")
    ?.match(/^Bearer\s+(.+)$/iu)?.[1];

  // Token not provided
  if (!sessionToken) {
    return Response.json(
      { success: false, error: "Invalid session" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    // Delete session
    await context.env.DB.prepare("DELETE FROM sessions WHERE session_token = ?")
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

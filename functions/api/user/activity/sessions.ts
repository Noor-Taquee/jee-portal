import { verifyRequest } from "../../../lib/auth";
import { D1Env, SessionsTableRow } from "../../../lib/d1";

export const onRequestGet: PagesFunction<D1Env> = async (context) => {
  try {
    // Validate token
    const res = await verifyRequest(context.request, context.env.DB, 0);

    // Invalid session
    if (!res || !res.user) {
      return Response.json(
        { success: false, error: res?.error || "Invalid session" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    // fetch sessions from database
    const { results: sessions } = await context.env.DB.prepare(
      `SELECT device, agent, created_at, expires_at FROM sessions WHERE user_id = ?`
    )
      .bind(res.user.id)
      .all<SessionsTableRow>();

    // Return success along sessions
    return Response.json({
      success: true,
      result: {
        sessions: sessions,
      }
    });
  } catch {
    return Response.json(
      { success: false, error: "Unable to fetch sessions" },
      { status: 500 }
    );
  }
};

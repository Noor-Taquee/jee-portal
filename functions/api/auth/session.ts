import { verifyRequest } from "../../lib/auth";
import { D1Env } from "../../lib/d1";

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

    const user = res.user;

    // Return success along user data
    return Response.json(
      {
        success: true,
        user: {
          name: user.name,
          username: user.username,
          role: user.role,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json(
      { success: false, error: "Unable to restore session" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
};

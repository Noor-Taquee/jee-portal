import { D1Env } from "../../lib/d1";
import { validateAndRefreshSession } from "../../lib/session";

export const onRequestGet: PagesFunction<D1Env> = async (context) => {
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
    const user = await validateAndRefreshSession(context.env.DB, sessionToken);

    if (!user) {
      return Response.json(
        { success: false, error: "Invalid session" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    return Response.json(
      {
        success: true,
        user: { name: user.name, username: user.username, role: user.role },
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

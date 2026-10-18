import { UsersTableRow } from "./d1";
import { validateAndRefreshSession } from "./session";

export type Role = {
  user?: UsersTableRow;
  error?: string;
};

export async function verifyRequest(
  request: Request,
  database: D1Database,
  timeMargin: number = 2 * 24 * 60 * 60 * 1000
): Promise<{ user?: UsersTableRow; error?: string } | null> {
  // Extract session token
  const sessionToken = request.headers
    .get("Authorization")
    ?.match(/^Bearer\s+(.+)$/iu)?.[1];

  // Token not provided
  if (!sessionToken) {
    return { user: undefined, error: "Invalid session" };
  }

  try {
    const session = await validateAndRefreshSession(
      request.headers.get("user-agent") || "",
      database,
      sessionToken,
      Date.now(),
      timeMargin
    );

    if (!session) {
      return { user: undefined, error: "Invalid or expired session" };
    }

    const user = await database
      .prepare("SELECT * FROM users WHERE id = ?")
      .bind(session.user_id)
      .first<UsersTableRow>();

    if (!user) {
      return {
        user: undefined,
        error: "User not found",
      };
    }

    return { user: user };
  } catch {
    return { user: undefined, error: "Internal Authentication Error" };
  }
}

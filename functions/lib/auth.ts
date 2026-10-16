import { validateAndRefreshSession } from "./session";

export type Role = {
  role: "admin" | "student" | "maintainer" | "none";
  error?: string;
};

export async function verifyRequest(
  request: Request,
  env: D1Database
): Promise<Role> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return { role: "none", error: "No authorization token provided" };
  }

  const sessionToken = authHeader.match(/^Bearer\s+(.+)$/iu)?.[1];
  if (!sessionToken) {
    return { role: "none", error: "Invalid authorization token" };
  }

  try {
    const user = await validateAndRefreshSession(
      env,
      sessionToken,
      Date.now(),
      2 * 24 * 60 * 60 * 1000
    );

    if (!user) {
      return { role: "none", error: "Invalid or expired session" };
    }

    return { role: user.role as Role["role"] };
  } catch {
    return { role: "none", error: "Internal Authentication Error" };
  }
}

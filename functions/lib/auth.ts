export type Role = {
  role: "admin" | "student" | "maintainer" | "none";
  error?: string;
};

export async function verifyUserRole(
  request: Request,
  env: D1Database
): Promise<Role> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return { role: "none", error: "No authorization token provided" };
  }

  const sessionToken = authHeader.replace("Bearer ", "");

  try {
    const user = await env
      .prepare("SELECT role FROM users WHERE session_token = ?")
      .bind(sessionToken)
      .first<{ role: string }>();

    if (!user) {
      return { role: "none", error: "User not found" };
    }

    return { role: user.role as Role["role"] };
  } catch {
    return { role: "none", error: "Internal Authentication Error" };
  }
}

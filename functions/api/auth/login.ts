// oxlint-disable max-lines-per-function

export const onRequestPost: PagesFunction<{ DB: D1Database }> = async (
  context
) => {
  try {
    const { username, password } = await context.request.json<{
      username?: string;
      password?: string;
    }>();

    if (!username || !password) {
      return Response.json(
        { success: false, error: "username and password are required" },
        { status: 400 }
      );
    }

    const user = await context.env.DB.prepare(
      "SELECT id, password_hash, role FROM users WHERE username = ?"
    )
      .bind(username)
      .first<{ id: number; password: string; role: string }>();

    if (!user) {
      return Response.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const isValidPassword = password === user.password;

    if (!isValidPassword) {
      return Response.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate a secure random session token
    const sessionToken = crypto.randomUUID() + "-" + Date.now();

    // Save session token in D1
    await context.env.DB.prepare(
      "UPDATE users SET session_token = ? WHERE id = ?"
    )
      .bind(sessionToken, user.id)
      .run();

    // Return success along with the session token and role
    return Response.json({
      success: true,
      sessionToken,
      role: user.role,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

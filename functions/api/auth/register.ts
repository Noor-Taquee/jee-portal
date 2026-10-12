// oxlint-disable max-lines-per-function

export const onRequestPost: PagesFunction<{ DB: D1Database }> = async (
  context
) => {
  try {
    const {
      username,
      password,
      role = "student",
    } = await context.request.json<{
      username?: string;
      password?: string;
      role?: string;
    }>();

    if (!username || !password) {
      return Response.json(
        { success: false, error: "username and password are required" },
        { status: 400 }
      );
    }

    // Optional: Restrict manual role
    if (role !== "student") {
      return Response.json(
        { success: false, error: "Unauthorized role assignment" },
        { status: 403 }
      );
    }

    // 1. Check if username already exists
    const existingUser = await context.env.DB.prepare(
      "SELECT id FROM users WHERE username = ?"
    )
      .bind(username)
      .first<{ id: number }>();

    if (existingUser) {
      return Response.json(
        { success: false, error: "Username is already taken" },
        { status: 409 }
      );
    }

    // 2. Insert new user into D1 database
    const insertResult = await context.env.DB.prepare(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
    )
      .bind(username, password, role)
      .run();

    if (!insertResult.success) {
      return Response.json(
        { success: false, error: "Failed to register user" },
        { status: 500 }
      );
    }

    // 3. Automatically generate a session token so they are logged in right away
    const sessionToken = crypto.randomUUID() + "-" + Date.now();
    const userId = insertResult.meta.last_row_id;

    await context.env.DB.prepare(
      "UPDATE users SET session_token = ? WHERE id = ?"
    )
      .bind(sessionToken, userId)
      .run();

    return Response.json({
      success: true,
      message: "User registered successfully",
      sessionToken,
      role,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

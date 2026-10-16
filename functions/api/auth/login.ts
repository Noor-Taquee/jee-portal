// oxlint-disable max-lines-per-function

import { D1Env } from "../../lib/d1";
import { generateSession } from "../../lib/session";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
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
      "SELECT id, name, password, role FROM users WHERE username = ?"
    )
      .bind(username)
      .first<{ id: number; name: string; password: string; role: string }>();

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
    const session = generateSession();

    // Save session token in D1
    await context.env.DB.prepare(
      "UPDATE users SET session_token = ?, session_created_at = ?, session_expires_at = ? WHERE id = ?"
    )
      .bind(session.token, session.createdAt, session.expiresAt, user.id)
      .run();

    // Return success along with the session token and role
    return Response.json({
      success: true,
      token: session.token,
      user: {
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

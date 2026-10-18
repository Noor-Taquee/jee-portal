// oxlint-disable max-lines-per-function

import { D1Env } from "../../lib/d1";
import { generateSession } from "../../lib/session";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    // Extract username and password
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

    // Search user
    const user = await context.env.DB.prepare(
      "SELECT id, name, password, role FROM users WHERE username = ?"
    )
      .bind(username)
      .first<{ id: number; name: string; password: string; role: string }>();

    // Couldn't find username
    if (!user) {
      return Response.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Match password
    const isValidPassword = password === user.password;

    // Password didn't match
    if (!isValidPassword) {
      return Response.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate a session
    const session = generateSession(
      context.request.headers.get("user-agent") || ""
    );

    // Save session token in D1
    await context.env.DB.prepare(
      `INSERT INTO sessions
      (user_id, session_token, created_at, expires_at, device, agent)
      VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        user.id,
        session.token,
        session.createdAt,
        session.expiresAt,
        session.device,
        session.agent
      )
      .run();

    // Return success along user data and session token
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

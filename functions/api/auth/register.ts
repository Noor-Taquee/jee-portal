// oxlint-disable max-lines-per-function

import { D1Env } from "../../lib/d1";
import { generateSession } from "../../lib/session";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    const {
      name,
      username,
      password,
      role = "student",
    } = await context.request.json<{
      name?: string;
      username?: string;
      password?: string;
      role?: string;
    }>();

    if (!username || !password || !name) {
      return Response.json(
        { success: false, error: "Details not provided" },
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

    // 2. Generate a session token so users are logged in right away
    const session = generateSession();

    // 3. Insert new user into D1 database
    const insertResult = await context.env.DB.prepare(
      "INSERT INTO users (name, username, password, role, session_token, session_created_at, session_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        name,
        username,
        password,
        role,
        session.token,
        session.createdAt,
        session.expiresAt
      )
      .run();

    if (!insertResult.success) {
      return Response.json(
        { success: false, error: "Failed to register user" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "User registered successfully",
      token: session.token,
      user: {
        name: name,
        role: role,
      },
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

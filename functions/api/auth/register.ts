// oxlint-disable max-lines-per-function

import { D1Env } from "../../lib/d1";
import { generateSession } from "../../lib/session";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    // Extract user data
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

    // If details are not provided
    if (!username || !password || !name) {
      return Response.json(
        { success: false, error: "Details not provided" },
        { status: 400 }
      );
    }

    // Restrict manual role selection
    if (role !== "student") {
      return Response.json(
        { success: false, error: "Unauthorized role assignment" },
        { status: 403 }
      );
    }

    // TODO: Validate user data

    // Check if the username is already taken
    const existingUser = await context.env.DB.prepare(
      "SELECT id FROM users WHERE username = ?"
    )
      .bind(username)
      .first<{ id: number }>();

    // If username is already taken
    if (existingUser) {
      return Response.json(
        { success: false, error: "Username is already taken" },
        { status: 409 }
      );
    }

    // Generate a session so users are logged in right away
    const session = generateSession(
      context.request.headers.get("user-agent") || ""
    );

    // Insert new user into database
    const insertResult = await context.env.DB.prepare(
      `
          BEGIN;

          INSERT INTO users (name, username, password, role)
          VALUES (?, ?, ?, ?);

          INSERT INTO sessions (
            user_id, session_token, created_at, expires_at, device, agent
          )
          VALUES (
            last_insert_rowid(),
            ?, ?, ?, ?, ?
          );

          COMMIT;
        `
    )
      .bind(
        name,
        username,
        password,
        role,
        session.token,
        session.createdAt,
        session.expiresAt,
        session.device,
        session.agent
      )
      .run();

    // If insertion fails
    if (!insertResult.success) {
      return Response.json(
        { success: false, error: "Failed to register user" },
        { status: 500 }
      );
    }

    // Return success along user data and session token
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

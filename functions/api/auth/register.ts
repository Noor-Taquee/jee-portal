import { hashPassword } from "../../lib/crypto";
import { D1Env } from "../../lib/d1";
import { generateSession } from "../../lib/session";
import { checkPassword, checkUsername } from "../../lib/userdata";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    // Extract user data
    const {
      name: rawName,
      username: rawUsername,
      password: rawPassword,
      role = "student",
    } = await context.request.json<{
      name?: unknown;
      username?: unknown;
      password?: unknown;
      role?: unknown;
    }>();

    // If details are not provided
    if (
      !rawUsername ||
      typeof rawUsername !== "string" ||
      !rawPassword ||
      typeof rawPassword !== "string" ||
      !rawName ||
      typeof rawName !== "string" ||
      typeof role !== "string"
    ) {
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

    // check name
    const name = rawName.trim();
    if (name.length < 1) {
      return Response.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // check username
    const username = rawUsername.trim().toLowerCase();
    const usernameResult = checkUsername(username);
    if (!usernameResult.success) {
      return Response.json(
        { success: false, error: usernameResult.error },
        { status: 400 }
      );
    }

    // check password
    const passwordResult = checkPassword(rawPassword);
    if (!passwordResult.success) {
      return Response.json(
        { success: false, error: passwordResult.error },
        { status: 400 }
      );
    }

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

    // Hash password
    const hashedPassword = await hashPassword(rawPassword);

    // Generate a session so users are logged in right away
    const session = generateSession(
      context.request.headers.get("user-agent") || ""
    );

    // Insert new user into database
    const insertUser = context.env.DB.prepare(
      `INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`
    ).bind(name, username, hashedPassword, role);

    // Insert session
    const insertSession = context.env.DB.prepare(
      `INSERT INTO sessions (user_id, session_token, created_at, expires_at, device, agent)
       VALUES (last_insert_rowid(), ?, ?, ?, ?, ?)`
    ).bind(
      session.token,
      session.createdAt,
      session.expiresAt,
      session.device,
      session.agent
    );

    const insertResult = await context.env.DB.batch([
      insertUser,
      insertSession,
    ]);

    // If insertion fails
    if (insertResult.some((i) => !i.success)) {
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
  } catch {
    return Response.json(
      { success: false, error: "Failed to register user" },
      { status: 500 }
    );
  }
};

import { D1Env } from "../lib/d1";
import { verifyRequest } from "../lib/auth";
import { UsersTableRow } from "../lib/d1";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    // Extract username
    const { username } = await context.request.json<{
      username?: string;
    }>();

    // If empty username is provided
    if (!username || username.trim().length < 1) {
      return Response.json(
        {
          success: false,
          user: null,
          error: "Invalid username",
        },
        { status: 400 }
      );
    }

    // Search user
    const searchedUser = await context.env.DB.prepare(
      `SELECT id, username, name, role, visibility FROM users WHERE username = ?`
    )
      .bind(username)
      .first<UsersTableRow>();

    if (!searchedUser) {
      return Response.json(
        {
          success: false,
          user: null,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const visibility = searchedUser.visibility ?? "none";

    // filter user details
    const publicUser = {
      username: searchedUser.username,
      name: searchedUser.name,
      role: searchedUser.role,
      visibility,
    };

    if (visibility === "none" || visibility === "users") {
      const result = await verifyRequest(context.request, context.env.DB, 0);

      if (!result || !result.user) {
        return Response.json({
          success: true,
          user: publicUser,
          visible: false,
        });
      }

      if (visibility === "none" && result.user.id !== searchedUser.id) {
        return Response.json({
          success: true,
          user: publicUser,
          visible: false,
        });
      }
    }

    return Response.json({ success: true, user: publicUser, visible: true });
  } catch {
    return Response.json(
      { success: false, error: "Unable to fetch user" },
      { status: 500 }
    );
  }
};

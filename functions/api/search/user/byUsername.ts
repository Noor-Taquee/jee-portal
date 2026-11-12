import { verifyRequest } from "../../../lib/auth";
import { D1Env } from "../../../lib/d1";
import { UsersTableRow } from "../../../lib/d1";

export const onRequestGet: PagesFunction<D1Env> = async (context) => {
  const search = new URL(context.request.url).searchParams
    .get("search")
    ?.trim();

  if (!search) {
    return Response.json({
      success: true,
      result: {
        user: null,
        visible: false,
      },
    });
  }

  try {
    const searchedUser = await context.env.DB.prepare(
      `SELECT username, name, role, visibility FROM users WHERE username = ?`
    )
      .bind(search)
      .first<
        Pick<UsersTableRow, "id" | "username" | "name" | "role" | "visibility">
      >();

    if (!searchedUser) {
      return Response.json(
        {
          success: false,
          result: {
            user: null,
            visible: true,
          },
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const visibility = searchedUser.visibility ?? "none";

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
          result: {
            user: publicUser,
            visible: false,
          },
        });
      }

      if (visibility === "none" && result.user.id !== searchedUser.id) {
        return Response.json({
          success: true,
          result: {
            user: publicUser,
            visible: false,
          },
        });
      }
    }

    return Response.json({
      success: true,
      result: {
        user: publicUser,
        visible: true,
      },
    });
  } catch {
    return Response.json(
      {
        success: false,
        result: {
          user: null,
          visible: false,
        },
        error: "Unable to search users",
      },
      { status: 500 }
    );
  }
};

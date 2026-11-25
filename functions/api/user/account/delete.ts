import { verifyRequest } from "../../../lib/auth";
import { D1Env } from "../../../lib/d1";

export const onRequestDelete: PagesFunction<D1Env> = async (context) => {
  try {
    // Validate token
    const res = await verifyRequest(context.request, context.env.DB, 0);

    // Invalid session
    if (!res || !res.user) {
      return Response.json(
        { success: false, error: res?.error || "Invalid session" },
        { status: 401 }
      );
    }

    // Delete the user
    const delUserQuery = await context.env.DB.prepare(
      `DELETE FROM users WHERE id = ?;`
    )
      .bind(res.user.id)
      .run();

    if (!delUserQuery.success) {
      return Response.json(
        { success: false, error: "Couldn't delete the account" },
        { status: 500 }
      );
    }

    if ((delUserQuery.meta?.changes ?? 0) === 0) {
      return Response.json(
        { success: false, error: "Account not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return Response.json(
      {
        success: false,
        error: "Unable to delete the account",
      },
      { status: 500 }
    );
  }
};

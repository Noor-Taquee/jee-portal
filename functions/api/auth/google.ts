import { D1Env } from "../../lib/d1";

export const onRequestPost: PagesFunction<D1Env> = async (context) => {
  try {
    // extract token
    const token = await context.request.json<{
      token?: string;
    }>();

    if (!token) {
      return Response.json({ error: "Missing token" }, { status: 400 });
    }

    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    if (!googleRes.ok) {
      return Response.json({ error: "Invalid Google token" }, { status: 401 });
    }
  } catch {
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
};

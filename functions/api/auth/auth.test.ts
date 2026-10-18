import { expect, test, vi } from "vitest";

import { onRequestPost as login } from "./login";
import { onRequestPost as logout } from "./logout";
import { onRequestPost as register } from "./register";
import { onRequestGet as getSession } from "./session";

type DatabaseOptions = {
  firstResult?: unknown;
  runSuccess?: boolean;
  runError?: Error;
};

function createDatabase({
  firstResult = null,
  runSuccess = true,
  runError,
}: DatabaseOptions = {}) {
  const writes: { query: string; values: unknown[] }[] = [];
  const database = {
    prepare: vi.fn((query: string) => ({
      bind: (...values: unknown[]) => ({
        first: vi.fn(async () => firstResult),
        run: vi.fn(async () => {
          writes.push({ query, values });
          if (runError) throw runError;
          return { success: runSuccess };
        }),
      }),
    })),
  } as unknown as D1Database;

  return { database, writes };
}

function createContext(
  database: D1Database,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  const { method = "POST", body, headers = {} } = options;
  const request = new Request("https://example.test/api/auth", {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  return { request, env: { DB: database } } as Parameters<typeof register>[0];
}

test("register rejects missing details before touching the database", async () => {
  const { database } = createDatabase();
  const response = await register(
    createContext(database, { body: { name: "Ada" } })
  );

  expect(response.status).toBe(400);
  expect(database.prepare).not.toHaveBeenCalled();
});

test("register rejects non-student role assignment", async () => {
  const { database } = createDatabase();
  const response = await register(
    createContext(database, {
      body: { name: "Ada", username: "ada", password: "secret", role: "admin" },
    })
  );

  expect(response.status).toBe(403);
  expect(database.prepare).not.toHaveBeenCalled();
});

test("register reports duplicate usernames", async () => {
  const { database } = createDatabase({ firstResult: { id: 1 } });
  const response = await register(
    createContext(database, {
      body: { name: "Ada", username: "ada", password: "secret" },
    })
  );

  expect(response.status).toBe(409);
  expect(database.prepare).toHaveBeenCalledTimes(1);
});

test("register creates a user and a session for the new account", async () => {
  const { database, writes } = createDatabase();
  const response = await register(
    createContext(database, {
      body: { name: "Ada", username: "ada", password: "secret" },
    })
  );
  const body = (await response.json()) as {
    success: boolean;
    token: string;
    user: { name: string; role: string };
  };

  expect(response.status).toBe(200);
  expect(body.success).toBe(true);
  expect(body.token).toBeTruthy();
  expect(body.user).toEqual({ name: "Ada", role: "student" });
  expect(writes.some((write) => /INSERT INTO users/i.test(write.query))).toBe(
    true
  );
  expect(
    writes.some((write) => /INSERT INTO sessions/i.test(write.query))
  ).toBe(true);
});

test("login rejects invalid credentials", async () => {
  const { database } = createDatabase({
    firstResult: { id: 1, name: "Ada", password: "correct", role: "student" },
  });
  const response = await login(
    createContext(database, {
      body: { username: "ada", password: "wrong" },
    })
  );

  expect(response.status).toBe(401);
});

test("login creates a session after valid credentials", async () => {
  const { database, writes } = createDatabase({
    firstResult: { id: 1, name: "Ada", password: "secret", role: "student" },
  });
  const response = await login(
    createContext(database, {
      body: { username: "ada", password: "secret" },
    })
  );
  const body = (await response.json()) as {
    success: boolean;
    token: string;
    user: { name: string; role: string };
  };

  expect(response.status).toBe(200);
  expect(body.success).toBe(true);
  expect(body.token).toBeTruthy();
  expect(body.user).toEqual({ name: "Ada", role: "student" });
  expect(
    writes.some((write) => /INSERT INTO sessions/i.test(write.query))
  ).toBe(true);
});

test("logout requires a bearer token", async () => {
  const { database } = createDatabase();
  const response = await logout(createContext(database));

  expect(response.status).toBe(401);
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(database.prepare).not.toHaveBeenCalled();
});

test("logout clears the matching session", async () => {
  const { database, writes } = createDatabase();
  const response = await logout(
    createContext(database, {
      headers: { Authorization: "Bearer session-token" },
    })
  );

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ success: true });
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(writes[0]?.query).toContain("DELETE FROM sessions");
  expect(writes[0]?.values).toEqual(["session-token"]);
});

test("session restore requires a bearer token", async () => {
  const { database } = createDatabase();
  const response = await getSession(createContext(database, { method: "GET" }));

  expect(response.status).toBe(401);
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(database.prepare).not.toHaveBeenCalled();
});

test("session restore returns the validated user", async () => {
  const now = Date.now();
  const pad = (value: number) => String(value).padStart(2, "0");
  const toDbDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const database = {
    prepare: vi.fn((query: string) => ({
      bind: (...values: unknown[]) => ({
        first: vi.fn(async () => {
          if (query.includes("FROM sessions")) {
            return {
              user_id: 1,
              session_token: "session-token",
              created_at: toDbDateTime(now),
              expires_at: toDbDateTime(now + 60_000),
              device: "Windows",
              agent: "Google Chrome",
            };
          }

          if (query.includes("FROM users")) {
            return {
              id: 1,
              name: "Ada Lovelace",
              username: "ada",
              role: "student",
            };
          }

          return null;
        }),
        run: vi.fn(async () => ({ success: true })),
      }),
    })),
  } as unknown as D1Database;

  const response = await getSession(
    createContext(database, {
      method: "GET",
      headers: {
        Authorization: "Bearer session-token",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0 Safari/537.36",
      },
    })
  );

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    success: true,
    user: { name: "Ada Lovelace", username: "ada", role: "student" },
  });
  expect(response.headers.get("Cache-Control")).toBe("no-store");
});

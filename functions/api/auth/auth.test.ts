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

test("register rejects missing details without querying the database", async () => {
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

test("register inserts the user and session in one write", async () => {
  const { database, writes } = createDatabase();
  const response = await register(
    createContext(database, {
      body: { name: "Ada", username: "ada", password: "secret" },
    })
  );
  const body = (await response.json()) as { success: boolean; token: string };
  const [write] = writes;

  expect(response.status).toBe(200);
  expect(body.success).toBe(true);
  expect(write?.query).toContain("INSERT INTO users");
  expect(write?.query).toContain(
    "session_token, session_created_at, session_expires_at"
  );
  expect(write?.values.slice(0, 4)).toEqual([
    "Ada",
    "ada",
    "secret",
    "student",
  ]);
  expect(write?.values[4]).toBe(body.token);
  expect(write?.values[5]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  expect(write?.values[6]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
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

test("login stores a generated session after valid credentials", async () => {
  const { database, writes } = createDatabase({
    firstResult: { id: 1, name: "Ada", password: "secret", role: "student" },
  });
  const response = await login(
    createContext(database, {
      body: { username: "ada", password: "secret" },
    })
  );
  const body = (await response.json()) as { success: boolean; token: string };
  const [write] = writes;

  expect(response.status).toBe(200);
  expect(body.success).toBe(true);
  expect(write?.query).toContain("UPDATE users SET session_token");
  expect(write?.values[0]).toBe(body.token);
  expect(write?.values[1]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  expect(write?.values[2]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  expect(write?.values[3]).toBe(1);
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
  expect(writes[0]?.query).toContain("session_token = NULL");
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
  const { database } = createDatabase({
    firstResult: {
      id: 1,
      name: "Ada Lovelace",
      username: "ada",
      role: "student",
      session_created_at: new Date(now).toISOString(),
      session_expires_at: new Date(now + 60_000).toISOString(),
    },
  });
  const response = await getSession(
    createContext(database, {
      method: "GET",
      headers: { Authorization: "Bearer session-token" },
    })
  );

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    success: true,
    user: { name: "Ada Lovelace", username: "ada", role: "student" },
  });
  expect(response.headers.get("Cache-Control")).toBe("no-store");
});

import { expect, test, vi } from "vite-plus/test";

import {
  SESSION_ABSOLUTE_TTL,
  SESSION_IDLE_TTL,
  validateAndRefreshSession,
} from "./session";

const WINDOWS_CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0 Safari/537.36";

function createDatabase(row: Record<string, unknown> | null) {
  const updates: { query: string; values: unknown[] }[] = [];
  const database = {
    prepare: vi.fn((query: string) => ({
      bind: (...values: unknown[]) => ({
        first: vi.fn(async () => row),
        run: vi.fn(async () => {
          updates.push({ query, values });
          return { success: true };
        }),
      }),
    })),
  } as unknown as D1Database;

  return { database, updates };
}

function toDbDateTime(timestamp: number) {
  const date = new Date(timestamp);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function sessionRow(createdAt: number, expiresAt: number) {
  return {
    user_id: 7,
    session_token: "token",
    created_at: toDbDateTime(createdAt),
    expires_at: toDbDateTime(expiresAt),
    device: "Windows",
    agent: "Google Chrome",
  };
}

test("returns the user id for a valid active session in the same browser", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + 1_000;
  const { database, updates } = createDatabase(
    sessionRow(createdAt, now + 60_000)
  );

  const user = await validateAndRefreshSession(
    WINDOWS_CHROME_UA,
    database,
    "token",
    now
  );

  expect(user).toEqual({ user_id: 7 });
  expect(updates[0]?.query).toContain("UPDATE sessions SET expires_at = ?");
});

test("never extends a session beyond its 45-day absolute limit", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + SESSION_ABSOLUTE_TTL - 100_000;
  const { database, updates } = createDatabase(
    sessionRow(createdAt, now + 60_000)
  );

  await validateAndRefreshSession(WINDOWS_CHROME_UA, database, "token", now);

  expect(updates[0]?.query).toContain("UPDATE sessions SET expires_at = ?");
  expect(updates[0]?.values[0]).toBe(
    new Date(createdAt + SESSION_ABSOLUTE_TTL)
      .toISOString()
      .replace("T", " ")
      .slice(0, 19)
  );
});

test("rejects a session when browser device or agent does not match", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + 1_000;
  const { database } = createDatabase(sessionRow(createdAt, now + 60_000));

  const user = await validateAndRefreshSession(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    database,
    "token",
    now
  );

  expect(user).toBeNull();
});

test("revokes an expired session", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + SESSION_IDLE_TTL + 5_000;
  const { database, updates } = createDatabase(
    sessionRow(createdAt, now - 1_000)
  );

  const user = await validateAndRefreshSession(
    WINDOWS_CHROME_UA,
    database,
    "token",
    now
  );

  expect(user).toBeNull();
  expect(updates[0]?.query).toContain(
    "DELETE FROM sessions WHERE session_token = ?"
  );
});

test("returns null when no session matches", async () => {
  const { database, updates } = createDatabase(null);

  const user = await validateAndRefreshSession(
    WINDOWS_CHROME_UA,
    database,
    "missing",
    1_000
  );

  expect(user).toBeNull();
  expect(updates).toHaveLength(0);
});

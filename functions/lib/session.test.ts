import { expect, test, vi } from "vitest";

import {
  SESSION_ABSOLUTE_TTL,
  SESSION_IDLE_TTL,
  validateAndRefreshSession,
} from "./session";

function createDatabase(row: Record<string, unknown> | null) {
  const updates: { query: string; values: unknown[] }[] = [];
  const database = {
    prepare: vi.fn((query: string) => ({
      bind: (...values: unknown[]) => ({
        first: () => Promise.resolve(row),
        run: () => {
          updates.push({ query, values });
          return Promise.resolve({ success: true });
        },
      }),
    })),
  } as unknown as D1Database;

  return { database, updates };
}

function databaseTimestamp(timestamp: number) {
  return new Date(timestamp).toISOString().replace("T", " ").slice(0, 19);
}

function sessionRow(createdAt: number, expiresAt: number) {
  return {
    id: 7,
    name: "Ada Lovelace",
    username: "ada123",
    role: "student",
    session_created_at: new Date(createdAt).toISOString(),
    session_expires_at: new Date(expiresAt).toISOString(),
  };
}

test("extends an active session by three days", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + 1_000;
  const { database, updates } = createDatabase(
    sessionRow(createdAt, now + 100)
  );

  const user = await validateAndRefreshSession(database, "token", now);

  expect(user?.username).toBe("ada123");
  expect(updates[0]?.values).toEqual([
    databaseTimestamp(now + SESSION_IDLE_TTL),
    7,
    "token",
  ]);
});

test("never extends a session beyond its 45-day absolute limit", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + SESSION_ABSOLUTE_TTL - 100_000;
  const { database, updates } = createDatabase(sessionRow(createdAt, now + 10));

  await validateAndRefreshSession(database, "token", now);

  expect(updates[0]?.values[0]).toBe(
    databaseTimestamp(createdAt + SESSION_ABSOLUTE_TTL)
  );
});

test("revokes an expired session", async () => {
  const createdAt = 1_000_000;
  const now = createdAt + SESSION_IDLE_TTL;
  const { database, updates } = createDatabase(
    sessionRow(createdAt, now - 1_000)
  );

  const user = await validateAndRefreshSession(database, "token", now);

  expect(user).toBeNull();
  expect(updates[0]?.query).toContain("session_token = NULL");
});

test("returns null when no session matches", async () => {
  const { database, updates } = createDatabase(null);

  const user = await validateAndRefreshSession(database, "missing", 1_000);

  expect(user).toBeNull();
  expect(updates).toHaveLength(0);
});

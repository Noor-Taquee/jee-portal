import { UsersTableRow } from "./d1";

/**
 * The idle TTL (Time To Live) for a session, after which the session is considered expired if there has been no activity.
 * This is set to 3 days.
 */
export const SESSION_IDLE_TTL = 3 * 24 * 60 * 60 * 1000;

/**
 * The absolute TTL (Time To Live) for a session, after which the session is considered expired regardless of activity.
 * This is set to 45 days.
 */
export const SESSION_ABSOLUTE_TTL = 45 * 24 * 60 * 60 * 1000;

export function calculateTimeElapsed(
  from: string | number,
  to: string | number = new Date().toISOString()
) {
  const oldStamp = new Date(from);
  const newStamp = new Date(to);
  const seconds = (newStamp.getTime() - oldStamp.getTime()) / 1000;
  return seconds;
}

/**
 * Returns a date as a string value in ISO 8601 format.
 * @param time date as string in ISO format
 * @returns
 */
export function toISO8601String(time: string) {
  return time.replace("T", " ").slice(0, 19);
}

/**
 * Generates a new session token along with its creation and expiry timestamps.
 * The session token is a combination of a UUID and the current timestamp.
 * The creation timestamp is the current time, and the expiry timestamp is calculated based on the idle TTL.
 * @returns
 */
export function generateSession() {
  const now = new Date();
  const sessionToken = crypto.randomUUID() + "-" + now.getTime();
  const sessionCreatedAt = toISO8601String(now.toISOString());
  const sessionExpiresAt = toISO8601String(
    new Date(now.getTime() + SESSION_IDLE_TTL).toISOString()
  );
  return { sessionToken, sessionCreatedAt, sessionExpiresAt };
}

/**
 * Revokes an expired session by clearing the session token and timestamps in the database.
 * @param database The D1 database instance to update the session information.
 * @param sessionUserId The ID of the user whose session is to be revoked.
 * @param token The session token to be revoked.
 */
async function revokeExpiredSession(
  database: D1Database,
  sessionUserId: number,
  token: string
) {
  await database
    .prepare(
      "UPDATE users SET session_token = NULL, session_created_at = NULL, session_expires_at = NULL WHERE id = ? AND session_token = ?"
    )
    .bind(sessionUserId, token)
    .run();
}

/**
 * Extends the expiry of a valid session if it is still active.
 * @param database The D1 database instance to update the session information.
 * @param sessionUserId The ID of the user whose session expiry is to be extended.
 * @param createdAt The timestamp when the session was created.
 * @param token The session token.
 * @param currentTime The current time in milliseconds since epoch.
 */
async function extendSessionExpiry(
  database: D1Database,
  sessionUserId: number,
  createdAt: string,
  token: string,
  currentTime: number
) {
  const creationDate = new Date(createdAt);

  const absolueExpiryDate = new Date(
    creationDate.getTime() + SESSION_ABSOLUTE_TTL
  );

  const refreshedExpiryDate = new Date(currentTime + SESSION_IDLE_TTL);

  const newExpiryDate = new Date(
    Math.min(absolueExpiryDate.getTime(), refreshedExpiryDate.getTime())
  );

  await database
    .prepare(
      "UPDATE users SET session_expires_at = ? WHERE id = ? AND session_token = ?"
    )
    .bind(toISO8601String(newExpiryDate.toISOString()), sessionUserId, token)
    .run();
}

export type SessionUser = {
  id: number;
  name: string;
  username: string;
  role: "admin" | "student" | "maintainer";
};

/**
 * Validates a session token and refreshes its expiry if valid. If the session is invalid or expired, it will be revoked.
 * @param database The D1 database instance to query and update the session information.
 * @param token The session token to validate and refresh.
 * @param currentTime Optional parameter to specify the current time in milliseconds since epoch. Defaults to the current time.
 * @param timeMargin Optional parameter to specify the time margin in milliseconds for extending the session expiry. Defaults to `SESSION_IDLE_TTL`.
 * @returns
 */
export async function validateAndRefreshSession(
  database: D1Database,
  token: string,
  currentTime = new Date().getTime(),
  timeMargin = SESSION_IDLE_TTL
): Promise<SessionUser | null> {
  const session = await database
    .prepare(
      "SELECT id, name, username, role, session_created_at, session_expires_at FROM users WHERE session_token = ?"
    )
    .bind(token)
    .first<Omit<UsersTableRow, "password" | "session_token">>();

  // Check if the session does not exist
  if (!session) return null;

  const createdAt = session.session_created_at;
  const expiresAt = session.session_expires_at;

  if (
    createdAt === null ||
    expiresAt === null ||
    // if token's idle session has expired
    calculateTimeElapsed(expiresAt, currentTime) >= 0 ||
    // if token's absolute session has expired
    calculateTimeElapsed(createdAt, currentTime) > SESSION_ABSOLUTE_TTL / 1000
  ) {
    await revokeExpiredSession(database, session.id, token);
    return null;
  }

  const timeToExpire = calculateTimeElapsed(currentTime, expiresAt);

  if (timeToExpire <= timeMargin) {
    await extendSessionExpiry(
      database,
      session.id,
      createdAt,
      token,
      currentTime
    );
  }

  return {
    id: session.id,
    name: session.name,
    username: session.username,
    role: session.role,
  };
}

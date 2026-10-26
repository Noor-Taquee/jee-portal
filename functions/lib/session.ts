import { SessionsTableRow } from "./d1";

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

function parseUserAgent(ua = "") {
  let device = "Unknown OS";
  let agent = "Unknown Browser";

  // Detect Operating System (device)
  if (/windows/iu.test(ua)) device = "Windows";
  else if (/macintosh|mac os x/iu.test(ua)) device = "macOS";
  else if (/linux/iu.test(ua)) device = "Linux";
  else if (/android/iu.test(ua)) device = "Android";
  else if (/iuphone|ipad|ipod/iu.test(ua)) device = "iOS";

  // Detect Browser (agent)
  if (/edg/iu.test(ua)) agent = "Microsoft Edge";
  else if (/chrome|crios/iu.test(ua) && !/opr|edg/iu.test(ua))
    agent = "Google Chrome";
  else if (/firefox|fxios/iu.test(ua)) agent = "Mozilla Firefox";
  else if (/safari/iu.test(ua) && !/chrome|crios/iu.test(ua))
    agent = "Apple Safari";
  else if (/brave/iu.test(ua)) agent = "Brave";
  else if (/opr|opera/iu.test(ua)) agent = "Opera";

  return { device, agent };
}

export type Session = {
  /** The unique session token generated for the user session. It is a combination of a UUID and the current timestamp. */
  token: string;

  /** The timestamp when the session was created, formatted as an ISO 8601 string. */
  createdAt: string;

  /** The timestamp when the session will expire, formatted as an ISO 8601 string. */
  expiresAt: string;

  device: string;

  agent: string;
};

/**
 * Generates a new session token along with its creation and expiry timestamps.
 * @returns
 */
export function generateSession(userAgent: string = ""): Session {
  const { device, agent } = parseUserAgent(userAgent);

  const now = new Date();
  const token = crypto.randomUUID() + "-" + now.getTime();
  const createdAt = toISO8601String(now.toISOString());
  const expiresAt = toISO8601String(
    new Date(now.getTime() + SESSION_IDLE_TTL).toISOString()
  );
  return { token, createdAt, expiresAt, device, agent };
}

/**
 * Revokes a session by clearing the session row from the database.
 * @param database The D1 database instance to update the session information.
 * @param token The session token to be revoked.
 */
async function revokeSession(database: D1Database, token: string) {
  await database
    .prepare("DELETE FROM sessions WHERE session_token = ?")
    .bind(token)
    .run();
}

/**
 * Extends the expiry of a valid session if it is still active.
 * @param database The D1 database instance to update the session information.
 * @param createdAt The timestamp when the session was created.
 * @param token The session token.
 * @param currentTime The current time in milliseconds since epoch.
 */
async function extendSessionExpiry(
  database: D1Database,
  token: string,
  createdAt: string,
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
    .prepare("UPDATE sessions SET expires_at = ? WHERE session_token = ?")
    .bind(toISO8601String(newExpiryDate.toISOString()), token)
    .run();
}

/**
 * Validates a session token and refreshes its expiry if valid. If the session is invalid or expired, it will be revoked.
 * @param database The D1 database instance to query and update the session information.
 * @param token The session token to validate and refresh.
 * @param currentTime Optional parameter to specify the current time in milliseconds since epoch. Defaults to the current time.
 * @param timeMargin Optional parameter to specify the time margin in milliseconds for extending the session expiry. Defaults to `SESSION_IDLE_TTL`.
 * @returns
 */
export async function validateAndRefreshSession(
  userAgent: string,
  database: D1Database,
  token: string,
  currentTime = new Date().getTime(),
  timeMargin = SESSION_IDLE_TTL
): Promise<{ user_id: number } | null> {
  const { device, agent } = parseUserAgent(userAgent);

  // Search token
  const session = await database
    .prepare("SELECT * FROM sessions WHERE session_token = ?")
    .bind(token)
    .first<SessionsTableRow | null>();

  // Check if the session does not exist
  if (!session) return null;

  // Check if the environment is different
  if (device !== session.device || agent !== session.agent) return null;

  const createdAt = session.created_at;
  const expiresAt = session.expires_at;

  if (
    !createdAt ||
    !expiresAt ||
    // if token's idle session has expired
    calculateTimeElapsed(expiresAt, currentTime) >= 0 ||
    // if token's absolute session has expired
    calculateTimeElapsed(createdAt, currentTime) > SESSION_ABSOLUTE_TTL / 1000
  ) {
    await revokeSession(database, token);
    return null;
  }

  // Calculate the time to active token expiry
  const timeToExpire = calculateTimeElapsed(currentTime, expiresAt);

  // if the time is less than the margin
  if (timeToExpire <= timeMargin) {
    await extendSessionExpiry(database, token, createdAt, currentTime);
  }

  //
  return { user_id: session.user_id };
}
